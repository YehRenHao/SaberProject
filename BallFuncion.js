function handleJson(files) {
    var file = files[0];
    file.text().then(
        function (data) {
            jsonData = JSON.parse(data);
            if (jsonData !== undefined) {
                console.log(jsonData);
                if (jsonData.BPM !== undefined && jsonData.offset !== undefined && jsonData.notes !== undefined) {
                    bpm = jsonData.BPM;
                    bpmTime = (60 / bpm) * 4;
                    offset = jsonData.offset;
                    // $('#BPMVal').val(bpm);
                    // $('#offsetVal').val(offset);
                    hasJsonFile = true;
                    alert('load finish!');
                } else {
                    alert('json file is incorrect!');
                }
            }
        }
    );
}


// function SetBallGroupPosition() {
//     ballGroup.position.z = ((au.currentTime - offset) / bpmTime) * distance;
// }

$("#readBallsBtn").click(() => {
    $("#readBalls").click();
});