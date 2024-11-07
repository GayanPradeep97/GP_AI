from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pydub import AudioSegment
import speech_recognition as sr
from pydub.utils import which

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests

# Set the path to ffmpeg and ffprobe if not detected automatically
AudioSegment.converter = r"F:\My Presonal projects\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"
AudioSegment.ffprobe = r"F:\My Presonal projects\ffmpeg-master-latest-win64-gpl\bin\ffprobe.exe"



# Set environment variable for ffmpeg and ffprobe paths
os.environ["PATH"] += os.pathsep + r"F:\My Presonal projects\ffmpeg-master-latest-win64-gpl\bin"

print(f"FFmpeg Path: {AudioSegment.converter}")
print(f"FFprobe Path: {AudioSegment.ffprobe}")


@app.route('/upload-audio', methods=['POST'])
def upload_audio():
    # Check if the 'file' part is in the request
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Check for MP3 format
    if not file.filename.endswith('.mp3'):
        return jsonify({"error": "Unsupported file format. Please upload an MP3 file."}), 400

    # Save the uploaded file
    os.makedirs('uploads', exist_ok=True)
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    # Convert the audio to WAV format using pydub
    try:
        audio = AudioSegment.from_mp3(file_path)
        wav_path = file_path.replace(".mp3", ".wav")
        audio.export(wav_path, format="wav")
    except Exception as e:
        return jsonify({"error": f"Failed to process audio file: {e}"}), 500

    # Transcribe the audio using SpeechRecognition
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(wav_path) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
    except sr.UnknownValueError:
        return jsonify({"error": "Could not understand audio"}), 400
    except sr.RequestError as e:
        return jsonify({"error": f"Could not request results from the speech recognition service; {e}"}), 500

    # Clean up the files if needed
    os.remove(file_path)
    os.remove(wav_path)

    return jsonify({"text": text})

if __name__ == '__main__':
    app.run(debug=True)
