Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

webCamera = document.getElementById("Webcam");
Webcam.attach(webCamera);

function take_image() {
    Webcam.snap(function (captured_img) {
        document.getElementById("Result").innerHTML = '<img id="captured_img" src="' + captured_img + '"/>';
    });
}


console.log(ml5.version);

ml5_model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MWlgAZXAu/model.json", model_loaded);

function model_loaded() {
    console.log("mOdel LOaded!")
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + emoji_1;
    speak_data_2 = "and the second prediction is " + emoji_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {

    var img = document.getElementById("captured_img");
    ml5_model.classify(img, getResult)

}

function getResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;


        emoji_1 = results[0].label;
        emoji_2 = results[1].label;
        speak()

        if (results[0].label == "Happy") {
            document.getElementById("emoji_1").innerHTML = "&#128522;";
        }


        if (results[0].label == "sad") {
            document.getElementById("emoji_1").innerHTML = "&#128532;";
        }

        if (results[0].label == "Angry") {
            document.getElementById("emoji_1").innerHTML = "&#128545;";
        }


        if (results[1].label == "Happy") {
            document.getElementById("emoji_2").innerHTML = "&#128522;";
        }

        if (results[1].label == "Sad") {
            document.getElementById("emoji_2").innerHTML = "&#128532;";
        }

        if (results[1].label == "Angry") {
            document.getElementById("emoji_2").innerHTML = "&#128545;";
        }
    }
}