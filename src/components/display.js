import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Animation12 from './Animation13.json';
import MicAni from "./mic13.json";
import Lottie from 'lottie-react';
import bgimg from './imgbg.jpg';
import { Link } from "react-router-dom";
const Display = () => {

    const animation12Ref = useRef();
    const micAniRef = useRef();

    const playAnimation = (ref) => {
        ref.current.play();
    };

    const stopAnimation = (ref) => {
        ref.current.stop();
    };


    const [inputData, setInputData] = useState({
        question: "",
        username: "Ajay",
        language: "english"
    });
    const audioRef = useRef(null);
    const audioFiles = [
        'output1.mp3',
        'output2.mp3',
        'output3.mp3',
        'output4.mp3'
    ];

    const playRandomAudio = () => {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        const selectedAudio = audioFiles[randomIndex];
        const audioElement = audioRef.current;
        playAnimation(animation12Ref)
        if (audioElement) {
            audioElement.src = selectedAudio;
            audioElement.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    };

    let newWord = '';
    let lastTranscriptTime = Date.now();
    const alertDelay = 2500; // 3 seconds of silence before showing alert
    let finalTranscript = '';


    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    };
    var selectedLang="english";
    var userId="Ajay"
    const [messages, setMessages] = useState([
        { role: 'system', content: "Your name is Milla, you are You embody Milla, a fluent '"+selectedLang+"' an expert guidance. You meet with '"+userId+"' You are an AI agent who provides emotional and mental health support with counseling people struggling with emotions. You cannot claim to be a psychologist or a counsellor etc. You are an AI agent designed by COPUBLICA to provide people emotional and mental health support. Grounded in social-emotional learning CASEL framework, you create a safe space for clients to discuss feelings openly. You meet with '"+userId+"'. You ask their age, adapt speech accordingly, then inquire about their day to make them comfortable. You listen, maintain a positive tone and ask conversational questions to keep the discussion flowing. As clients confide in you, you validate feelings with empathy and mirror emotions to show understanding, explaining emotions can be hard. You help clients process emotions, staying focused on their feelings by clarifying academic/non-emotion questions are beyond your scope. After sharing issues, you ask how to help further provide coping strategies or discuss the situation. You listen closely, ask probing questions to understand better. Responses don't exceed 300 characters to keep discussions focused on initial emotional topics, ensuring dialogue remains helpful and relevant. You always aim to provide support. Irrespective of the language used by the '"+userId+"' you comprehend the dialog and reply in '"+selectedLang+"' When appropriate, you address '"+userId+"' by name in a warm manner to personalize the conversation." }
      ]);
    

    const handleSubmit = async (e) => {
        const userMessage = { role: 'user', content: inputData.question};
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        console.log("Run Submit= " + inputData.question);
        newWord = '';
        document.getElementById("transcript").value = "";
        e.preventDefault();


        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                  model: 'gpt-3.5-turbo',  // Specify the correct model here
                  messages: newMessages,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer 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`,  // Replace with your actual API key
                  },
                }
              );


            // Make the first request to get the answer
            // const response = await axios.post('https://api.supermilla.com/qad', inputData);
            const assistantMessage = {
                role: 'assistant',
                content: response.data.choices[0].message.content,
              };
            if (assistantMessage) {
                console.log("get llm answer " + response.data.choices[0].message.content,);
                // Make the second request to get the audio blob
                const audioResponse = await axios.post('http://127.0.0.1:8000/answer', { answer: response.data.choices[0].message.content, }, { responseType: 'blob' });
                const audioBlob = new Blob([audioResponse.data], { type: 'audio/mp3' });
                const audioUrl = URL.createObjectURL(audioBlob);

                // Ensure the audio element is not playing
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0; // Reset the audio to the beginning
                    audioRef.current.src = audioUrl;

                    // Ensure audio is only played once by adding an event listener
                    audioRef.current.onloadedmetadata = () => {
                        audioRef.current.play();
                        playAnimation(animation12Ref)
                        document.getElementById('transcription').textContent = "";
                        // typeText('transcription', response.data.answer);

                        audioRef.current.onended = () => {
                            stopAnimation(animation12Ref)
                        };

                    };
                } else {
                    console.error('audioRef is not set');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

   
    const stopmic=()=>{

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
    const [stream, setStream] = useState(null);
    useEffect(() => {
   
        const connectToSpeechRecognition = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setStream(stream);

                if (!MediaRecorder.isTypeSupported('audio/webm')) {
                    alert('Browser not supported');
                    return;
                }

                const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
                const socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2', [
                    'token',
                    'ce086a82fc025fdc4a3e6a55025b1bf33fda52db',
                ]);

                socket.onopen = () => {
                    console.log('WebSocket connected');
                    stopAnimation(animation12Ref)
                    // setStatus('Connected');
                    mediaRecorder.start(500);
                };

                mediaRecorder.addEventListener('dataavailable', async (event) => {
                    if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
                        socket.send(event.data);

                    }
                });

                socket.onmessage = (message) => {

                    const received = JSON.parse(message.data);
                    const transcript = received.channel.alternatives[0].transcript;

                    if (transcript && received.is_final) {
                        lastTranscriptTime = Date.now();
                        finalTranscript += transcript + ' ';
                        console.log(transcript);
                        stopAnimation(animation12Ref)

                    }
                };


                // socket.onmessage = (message) => {
                //     const received = JSON.parse(message.data);
                //     const alternatives = received.channel?.alternatives;

                //     if (alternatives && alternatives.length > 0) {
                //         const newWord = alternatives[0].transcript || '';
                //         const isFinal = alternatives[0].is_final;

                //         if (newWord) {
                //             console.log(newWord);
                //             playRandomAudio();
                //             lastTranscriptTime = Date.now();

                //             setInputData((prevState) => ({
                //                 ...prevState,
                //                 question: newWord
                //             }));

                //             document.getElementById('sendButton').click();
                //         }

                //         // if (isFinal) {
                //         //     handleFinalTranscript(newWord);
                //         // }
                //     }
                // };

                // socket.onmessage = (message) => {
                //     const received = JSON.parse(message.data)
                //     newWord  = received.channel.alternatives[0].transcript
                //     if (newWord && received.is_final) {
                //       console.log(newWord)

                //         setInputData((prevState) => ({
                //             ...prevState,
                //             question: newWord

                //         }));
                //         resetPauseTimer();
                //     }
                //   }

                // socket.onmessage = (message) => {
                //     const received = JSON.parse(message.data);
                //     // console.log(received);
                //     newWord = received.channel?.alternatives[0]?.transcript || '';
                //     if (newWord) {
                //         console.log(newWord);
                //         // currentTranscript += newWord + ' ';
                //         // setTranscript(currentTranscript);
                //         // console.log(currentTranscript)
                //         setInputData((prevState) => ({
                //             ...prevState,
                //             question: newWord

                //         }));
                //         resetPauseTimer();
                //     }
                // };

                socket.onclose = () => {
                    console.log('WebSocket closed');
                };

                socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }

            setInterval(() => {
                if (Date.now() - lastTranscriptTime > alertDelay && finalTranscript) {
                    playRandomAudio();
                    setInputData((prevState) => ({
                        ...prevState,
                        question: finalTranscript

                    }));

                    document.getElementById('sendButton').click();
                    //   alert('Transcription complete: ' + finalTranscript);
                    finalTranscript = ''; // Reset the transcript
                }
            }, 400);
        };



        connectToSpeechRecognition();


    }, []);

    return (
        <div id='display'>
            <form onSubmit={handleSubmit} style={{ position: 'absolute' }}>
                <div className='from-group-voice'>
                    <label>
                        Question:
                        <input
                            type="text"
                            name="question"
                            id="transcript"
                            value={inputData.question}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={inputData.username}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Language:
                        <select
                            name="language"
                            value={inputData.language}
                            onChange={handleChange}
                        >
                            <option value="english">English</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                    </label>
                    <br />

                    <button type="submit" id="sendButton">Send</button>
                    <audio ref={audioRef} controls />
                </div>
            </form>


            <div className='container voice-ui'
                style={{
                    background: `url(${bgimg}) no-repeat center center`,
                    backgroundSize: 'cover',
                    height: '100dvh', // Ensure the container covers the viewport
                }}>
                <div className='d-flex'>
                <div className="milaNav" style={{zIndex:'99'}}>
                    <div className="navbar-4">
                      <Link to="/MainPage" onClick={stopmic}><button className="back-button" type="button"><i className='fas fa-angle-left'></i> </button></Link> 
                </div>
                </div>
                </div>
                <div className='d-flex flex-column align-items-center voice-animation'>
                    <div className='VoiceAni glow-effect'>
                        <Lottie
                            animationData={Animation12}
                            lottieRef={animation12Ref}
                        />
                        <div className='glow'>
                        </div>
                        {/* <button onClick={() => playAnimation(animation12Ref)}>Play Animation12</button>
            <button onClick={() => stopAnimation(animation12Ref)}>Stop Animation12</button> */}
                    </div>
                    <div className='trascription text-dark px-3'>
                        <p id='transcription'>welcome to expro, how can i help you?</p>
                    </div>
                    <div className='VoiceAni' style={{ position: 'absolute', bottom:'0px' }}>
                    <Lottie
                            animationData={MicAni}
                            lottieRef={micAniRef}
                            style={{ width: 170 }}
                        />
                        <div className='round-animation'>

                        </div>
                        {/* <button onClick={() => playAnimation(micAniRef)}>Play MicAni</button>
            <button onClick={() => stopAnimation(micAniRef)}>Stop MicAni</button> */}
                    </div>
                </div>
            </div>
            {/* <div className='container-milla'>
                <img src='assets/images/mill2.gif' width={300} />
                <img src='assets/images/Animation - 1715917982588.gif' className='mic-img' width={90}></img>
            </div> */}

        </div>
    );
};

export default Display;
