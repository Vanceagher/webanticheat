document.addEventListener("visibilitychange", event => {
      if (document.visibilityState != "visible") {

document.title = "Get back here in 3"
setTimeout(function(){ if (document.visibilityState != "visible") {document.title = "Get back here in 2"}; }, 1000);
setTimeout(function(){ if (document.visibilityState != "visible") {document.title = "Get back here in 1"}; }, 2000);
setTimeout(function(){ if (document.visibilityState != "visible") {document.title = "Dang cheater!"}; }, 3000);

setTimeout(function(){ if (document.visibilityState != "visible") {alert("I know you swapped tabs.")}; }, 3000);

} else {
  document.title = "No Cheating"
}
    });

    "use strict"

        const _states = {
          idle: 0,
          loading: 1,
          enabled: 2,
          disabled: 3
        };
        let _state = _states.idle;

        function toggle_canvasContainer(isShow){
          const DOMcanvasContainer = document.getElementById('glanceTrackerCanvasContainer');
          if (!DOMcanvasContainer) return;
          DOMcanvasContainer.style.opacity = (isShow) ? '1' : '0';
        };

        function toggle_glanceTracking(event){ // the user clic on the button
          switch(_state){
            case _states.idle:
              init_glanceTracking();
              break;

            case _states.loading:
              break;

            case _states.enabled:
              JEELIZGLANCETRACKER.toggle_pause(true, true);
              toggle_canvasContainer(false);
              _state = _states.disabled;
              break;

            case _states.disabled:
              JEELIZGLANCETRACKER.toggle_pause(false, true);
              toggle_canvasContainer(true);
              _state = _states.enabled;
              break;
          }
          update_button();
        }; //end toggle_glanceTracking()

        function update_button(){
          const DOMbutton = document.getElementById('toggleGlanceTracking');
          let buttonText = 'undefined';

          switch(_state){
            case _states.idle:
            case _states.disabled:
              buttonText = 'Enable glance tracking';
              break;

            case _states.loading:
              buttonText = 'LOADING...';
              break;

            case _states.enabled:
              buttonText = 'Disable glance tracking';
              break;
          }
          DOMbutton.innerHTML = buttonText;
        }; //end update_button()

        function init_glanceTracking(){
          _state = _states.loading;
          JEELIZGLANCETRACKER.init({
            callbackTrack: function(isDetected){
              console.log('DETECTION changed! isDetected = ', isDetected);
              if(isDetected != true){
                alert('You looked away.')
              }
              //const DOMvideo = document.getElementById('jeeVideo');
              //if (!DOMvideo) return;
              /*
if (isDetected){
                DOMvideo.play();
                toggle_canvasContainer(false);
              } else {
                DOMvideo.pause();
                toggle_canvasContainer(true);

              }*/


            },

            callbackReady: function(error){
              if (error){
                alert('AN ERROR HAPPENS :( CODE =' + error);
                return;
              }
              console.log('JEELIZGLANCETRACKER is READY YEAH !');
              _state = _states.enabled;
              update_button();
              toggle_canvasContainer(true);
            },

            isDisplayVideo: false,
            canvasId: 'glanceTrackerCanvas',
            NNCPath: 'dist/' //where is NNC.json ?
          }); //end JEELIZGLANCETRACKER.init call
        }; //end init()
