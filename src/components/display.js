import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Animation12 from './Animation13.json';
import MicAni from "./mic13.json";
import Lottie from 'lottie-react';
import bgimg from './imgbg.jpg';

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
        language: "English"
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
    const handleSubmit = async (e) => {
        console.log("Run Submit= " + inputData.question);
        newWord = '';
        document.getElementById("transcript").value = "";
        e.preventDefault();
    
        try {
            // Make the first request to get the answer
            const response = await axios.post('http://127.0.0.1:5003/qad', inputData);
    
            if (response.data.answer) {
                console.log("get llm answer " + response.data.answer);
                // Make the second request to get the audio blob
                const audioResponse = await axios.post('http://127.0.0.1:8000/answer', { answer: response.data.answer }, { responseType: 'blob' });
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
                    document.getElementById('transcription').textContent = response.data.answer;
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
    
    function typeText(elementId, text, delay = 50) {
        const element = document.getElementById(elementId);
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, delay);
            }
        }

        element.textContent = ''; // Clear existing text
        type();
    }

    useEffect(() => {
        const connectToSpeechRecognition = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
              }, 500);
        };

        

        connectToSpeechRecognition();

       
    }, []);

    return (
        <div id='display'>
            <form onSubmit={handleSubmit} style={{position:'absolute'}}>
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
          height: '100vh', // Ensure the container covers the viewport
        }}
      >
         
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
          <div className='VoiceAni' style={{position:'absolute'}}>
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