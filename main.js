$(function() {
  var $start = $(".start");
  var $colorButton = $(".colorButton");
  var $simonSeq = [];
  var $playerSeq = [];
  var $header = $("h1");
  //console.log($header);
  var counter = 0;
  //generates random numbers and adds them to array
  function randomSeq() {
    for (var i = 0; i < 4; i++) {
      var sequence = Math.floor(Math.random() * 4);
      $simonSeq.push(sequence);
    }
  }

  $start.on("click", function() {
    // debugger;

    $header.removeClass("animated infinite flash");
    // $randomNum = [];
    $simonSeq = [];
    randomSeq(); //fill randomSeq array
    console.log($simonSeq);
    $playerSeq = [];
    console.log($playerSeq);
    playerArray = "";
    simonArray = "";
    counter = 0;
    startGame();
  });

  function startGame() {
    animation($simonSeq);
    playerClicks();
  }

  function playerClicks() {
    $colorButton.on("click", function() {
      // debugger;
      if ($(this).attr("id") === "color-0") {
        $playerSeq.push(0);
      } else if ($(this).attr("id") === "color-1") {
        $playerSeq.push(1);
      } else if ($(this).attr("id") === "color-2") {
        $playerSeq.push(2);
      } else if ($(this).attr("id") === "color-3") {
        $playerSeq.push(3);
      }
      counter++;
      console.log($playerSeq);
      if (counter === 4) {
        $colorButton.off("click");
        gameChecker();
      }
    });
  }

  // activate lights one after another
  function animation(randomNum) {
    $("#color-" + randomNum[0]).animate({ opacity: 0.5 }, "slow", function() {
      $("#color-" + randomNum[0]).animate({ opacity: 1.0 }, function() {
        $("#color-" + randomNum[1]).animate(
          { opacity: 0.5 },
          "slow",
          function() {
            $("#color-" + randomNum[1]).animate({ opacity: 1 }, function() {
              $("#color-" + randomNum[2]).animate(
                { opacity: 0.0 },
                "slow",
                function() {
                  $("#color-" + randomNum[2]).animate(
                    { opacity: 1 },
                    function() {
                      $("#color-" + randomNum[3]).animate(
                        { opacity: 0.5 },
                        "slow",
                        function() {
                          $("#color-" + randomNum[3]).animate({ opacity: 1 });
                        }
                      );
                    }
                  );
                }
              );
            });
          }
        );
      });
    });
  }

  function gameChecker() {
    var playerArray = "";
    var simonArray = "";

    if ($playerSeq.length === $simonSeq.length) {
      for (var i = 0; i < $playerSeq.length; i++) {
        playerArray += $playerSeq[i];
        simonArray += $simonSeq[i];
      }
      if (playerArray === simonArray) {
        swal({ title: "Congrats you won!", text: "Play Again" });
        score++;
      } else {
        swal({ title: "You lose!", text: "Play Again" });
      }
    } else {
      console.log("lose!!");
    }
  }
});
