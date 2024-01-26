<template>

<div class="row-container-whatSite">
    <button class="buttonwhatSite"
    style="width: 30%; background-color: white;" :style="{border: whatSite == 'OFFICE'? '#00bbff solid 2px':'none'}"
      @click="updateSite('OFFICE')"
    :disabled="whatSiteLock">
      <img  src="..\assets\Images\office.png"  height="50" 
      :style="{opacity: whatSite == 'OFFICE'? '1':'0.3'}">

    <div>  <span :style="{opacity: whatSite == 'OFFICE'? '1':'0.3',color: whatSite == 'OFFICE'? '#00bbff':'black',fontWeight:'bold'}">OFFICE</span></div>
    </button>
    <button class="buttonwhatSite"
    style="width: 30%; background-color: white;" :style="{border: whatSite == 'WFH'? '#00bbff solid 2px':'none'}"
      @click="updateSite('WFH')"
      :disabled="whatSiteLock">
      <img  src="..\assets\Images\WFH.png" height="50"
      :style="{opacity: whatSite == 'WFH'? '1':'0.3'}"
      >
      <div><span :style="{opacity: whatSite == 'WFH'? '1':'0.3',color: whatSite == 'WFH'? '#00bbff':'black',fontWeight:'bold'}">WFH</span></div>
    </button>
    <button class="buttonwhatSite"
    style="width: 30%; background-color: white;" :style="{border: whatSite == 'OBT'? '#00bbff solid 2px':'none'}"
      @click="updateSite('OBT')"
      :disabled="whatSiteLock">
      <img  src="..\assets\Images\Site.png"  height="50"
      :style="{opacity: whatSite == 'OBT'? '1':'0.3'}">
      <div><span :style="{opacity: whatSite == 'OBT'? '1':'0.3',color: whatSite == 'OBT'? '#00bbff':'black',fontWeight:'bold'}">OBT</span></div>
    </button>
  </div>

  <div style="float: left; ">
    <h5>Date: <span style="color: #00bbff;">{{ dateToday }}</span></h5>
  </div>

  <div>
    <div v-if="inputimage">
      <img :src="imageURL" alt="Selected Image" />
    </div>
    <div v-else>

      <input class="file" type="file" id="files" ref="file" accept="image/*" capture="camera"
        v-on:change="handleFileUpload($event, inorout)" hidden>
      <img v-if="imageURL == null" src="https://apps.fastlogistics.com.ph/fastdrive/ontimeinstaller/captureimage.jpg" alt="Camera Icon" @click="toggleCamera"
        style="height: 100%;width: 100%;" />
      <img v-else :src="imageURL" alt="Camera Icon" @click="toggleCamera" style="height: 100%;width: 100%;" />

    </div>

    <div>

        <h3
        style="color: #00bbff;"
        >{{ whatSite == "OFFICE"? "OFFICE":whatSite == "WFH"? "WORK FROM HOME": "OFFICIAL BUSINESS TRAVEL" }}</h3>

    </div>

    <div v-if="locationIn != ''" class="location">
      <div> <i class="bi bi-geo-alt-fill" style="color: #ff0000; fontSize: 20px;"></i></div>
      <div>
        <span style="float: left; height: 30px;">Location in:</span>
        <br>
        <span style="float: left;">{{ locationIn }}</span>
      </div>
    </div>
    <br>
    <div v-if="locationOut != ''" class="location">
      <div> <i class="bi bi-geo-alt-fill" style="color: #ff0000; fontSize: 20px;"></i></div>

      <div>
        <span style="float: left; height: 30px;">Location out:</span>
        <br>
        <span style="float: left;">{{ locationOut }}</span>
      </div>

    </div>

    <br>

    <div class="buttons">
      <button class="custom-button" @click="handleTimeIn" :disabled="(timeIn !== 'null' && timeIn !== '') || waiting"
        style=" border-bottom-left-radius: 10px;border-top-left-radius: 10px; 
  display: flex;
  align-items: center;
  justify-content: center;">
        <div v-if="waiting == false" 
        style="float: left;margin-left: 10px;">

          <i class="bi bi-stopwatch" style="color: #00bbff; fontSize: 20px;">&nbsp;</i>

        </div>

        <div style="float: left;">


          <span style="fontSize:15px; font-weight: bold;"> {{ waiting ? btnLoadingText : 'Time In' }}</span>

          <br>

          <span style="fontSize:20px; font-weight: bold; color: #00bbff;"> {{waiting ? '' : timeIn }} </span>

        </div>

      </button>

      <button class="custom-button" @click="handleTimeOut" :disabled="(timeOut !== 'null' && timeOut !== '') || waiting"
        style="border-bottom-right-radius: 10px;border-top-right-radius: 10px; display: flex;
  align-items: center;
  justify-content: center;">
        <div v-if="waiting == false" style="float: left;margin-left: 10px;">
          <i class="bi bi-stopwatch-fill" style="color: #ff0000; fontSize: 20px;">&nbsp;</i>
        </div>

        <div style="float: left;">
          <span class="text" style="fontSize:15px; font-weight: bold;">{{ waiting ? btnLoadingText : 'Time Out'
          }}</span>
          <br>
          <span class="text" style="fontSize:20px; font-weight: bold; color: #00bbff;"> {{ waiting ? '' :timeOut }} </span>

        </div>
      </button>
    </div>
    <br>

    <div class="total-time">
      <i class="bi bi-file-lock2" style="color: #00c41d; fontSize: 20px;"></i>
      <br>
      <span>{{ totalTime !== '' && totalTime !== 'null' ? totalTime : '--:--' }}</span>
    </div>

    <div class="version">
      <span>IOS Version: 1.2.2</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';
import moment from 'moment'
import ImageCompressor from 'image-compressor';
import VueGoogleMaps from '@fawmi/vue-google-maps'

const 
  rootLink = ref("https://apps.fastlogistics.com.ph/omapi/"),
  inputimage = ref(false),
  imageURL = ref(null),
  timeIn = ref(''),
  timeOut = ref(''),
  waiting = ref(false),
  locationIn = ref(''),
  locationOut = ref(''),
  totalTime = ref(''),
  nominatimTest = ref(''),
  route = useRoute(),
  latlong = ref(''),
  canvasRef = ref(null),
  files = ref(),
  inorout = ref(''),
  dateToday = ref(`${moment(String(new Date)).format('dddd MMMM D, yyyy')}`),
  whatSite = ref("OBT"),
  whatSiteLock = ref(false),
  btnLoadingText = ref('Please wait...')





onMounted(() => {
 

// const whatSite = ref('OFFICE');
// const whatSiteLock = ref(false);

// const updateSite = (site) => {
//   if (!whatSiteLock.value) {
//     whatSite.value = site;
//   }
// };

// const getButtonTextColor = (site) => {
//   return {
//     color: whatSite.value === site ? 'blue' : 'rgba(0, 0, 0, 0.2)'
//   };
// };

  canvasRef.value = document.querySelector('canvas');
  firstload()
})

async function firstload() {
  btnLoadingText.value = "Checking attendance..."
  let formData = new FormData();
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const today = new Date();
  formData.append("employeeId", route.query.id)
  formData.append("getDate", moment(String(today)).format('yyyy/MM/DD'))

  await axios.post(`${rootLink.value}api/FcAttendances/gettimeinoutSite`,
    formData, config).then(function (res) {
      if (res.status == "200") {

        waiting.value = false

        if (JSON.stringify(res.data) != '[]') {
          timeIn.value = res.data[0].timeIn
          locationIn.value = res.data[0].locationIn

          if (res.data[0].timeOut != null) {
            timeOut.value = res.data[0].timeOut
            locationOut.value = res.data[0].locationOut
          }

          if (res.data[0].totalTime != null) {
            totalTime.value = res.data[0].totalTime
          }

          if (res.data[0].workPlace != null) {
            whatSiteLock.value = true
            whatSite.value = res.data[0].workPlace
          }

        }
        imageURL.value = null

      } else {
        alert(res.data)

      }

    }).catch(function (error) {
      alert(error)

    })


}


async function updateSite(value){

if(value == "OFFICE"){
  whatSite.value = "OFFICE"
}else if(value == "WFH"){
  whatSite.value = "WFH"
}else if(value == "OBT"){
  whatSite.value = "OBT"
}


}

const nominatim = async () => {
  const options = {
    enableHighAccuracy: true,
    accuracy: { desiredAccuracy: 1 },
    // Set desired accuracy in meters
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      nominatimTest.value = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)

      if (nominatimTest.value.status == "200") {
        const temp = ref((await nominatimTest.value.data['display_name']).split(','))
        location.value = `${temp.value[0]} ${temp.value[1]} ${temp.value[2]} ${temp.value[3]} ${temp.value[4]} ${temp.value[5]}`
        latlong.value = `${position.coords.latitude}-${position.coords.longitude}`
      }



    },
      (error) => {
        alert("Failed to retrieve your location: " + error.message);
      },
      options
    )
  }
  else {
    alert("Geolocation is not supported by your browser")
  }

}


async function toggleCamera() {
  inorout.value = ''
  document.getElementById("files").click()
}


async function handleFileUpload(event, inorout) {
  btnLoadingText.value = "Compressing image..."


  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const compressedImage = await compressImage(file);
    files.value = compressedImage;
    imageURL.value = URL.createObjectURL(compressedImage);

    if (inorout == "timein") {
      handleTimeIn()
    } else if (inorout == "timeout") {
      handleTimeOut()
    }

  }
}
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const image = new Image();

      image.onload = function () {
        const canvas = document.createElement('canvas');
        const maxWidth = 800;
        const maxHeight = 800;
        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(resolve, 'image/jpeg', 0.7); // Save as JPEG with 70% quality
      };

      image.onerror = reject;
      image.src = event.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
async function handleTimeIn() {

  if (imageURL.value == null) {
    await toggleCamera()
    inorout.value = "timein"
  }


  if (imageURL.value != null) {

    // const canvas = document.getElementById("photoTaken");

    // const blob = await new Promise(resolve => {
    //   canvas.toBlob(blob => {
    //     resolve(blob);
    //   }, "image/jpeg");
    // });

    waiting.value = true
    btnLoadingText.value = "Getting location..."
    const options = {
      enableHighAccuracy: true,
      accuracy: { desiredAccuracy: 1 },
      // Set desired accuracy in meters
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        nominatimTest.value = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)

        if (nominatimTest.value.status == "200") {
          const temp = ref((await nominatimTest.value.data['display_name']).split(','))
          location.value = `${temp.value[0]} ${temp.value[1]} ${temp.value[2]} ${temp.value[3]} ${temp.value[4]} ${temp.value[5]}`
          latlong.value = `${position.coords.latitude}-${position.coords.longitude}`

          btnLoadingText.value = "Processing attendance..."

          let formData = new FormData();
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          let file = files.value
          const today = new Date();

          formData.append("employeeId", route.query.id)
          formData.append("workPlace", whatSite.value)
          formData.append("TimeIn", moment(String(today)).format('hh:mm A'))
          formData.append("LocationIn", location.value)
          formData.append("department", route.query.department)
          formData.append("sbu", route.query.sbu)
          formData.append("date", moment(String(today)).format('yyyy/MM/DD'))
          formData.append("folder", route.query.folder)
          formData.append("fileName", route.query.fileName)
          formData.append("LatLongIn", latlong.value)
          formData.append("uploadAttachments", file)

          await axios.post(`${rootLink.value}api/FcAttendances/uploadFile`,
            formData, config).then(function (res) {
              if (res.status == "200") {
                firstload()
              } else {
                alert(res.status)
                waiting.value = false
              }

            }).catch(function (error) {
              alert(error)
              waiting.value = false
            })
        }



      },
        (error) => {
          alert("Failed to retrieve your location: " + error.message);
        },
        options
      )
    }
    else {
      alert("Geolocation is not supported by your browser")
    }



  }

}

async function handleTimeOut() {
  if (imageURL.value == null) {
    await toggleCamera();
    inorout.value = "timeout"
  }

  if (imageURL.value != null) {

    waiting.value = true
    btnLoadingText.value = "Getting location..."
    const options = {
      enableHighAccuracy: true,
      accuracy: { desiredAccuracy: 1 },
      // Set desired accuracy in meters
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        nominatimTest.value = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)

        if (nominatimTest.value.status == "200") {
          const temp = ref((await nominatimTest.value.data['display_name']).split(','))
          location.value = `${temp.value[0]} ${temp.value[1]} ${temp.value[2]} ${temp.value[3]} ${temp.value[4]} ${temp.value[5]}`
          latlong.value = `${position.coords.latitude}-${position.coords.longitude}`

          btnLoadingText.value = "Processing attendance..."

          let formData = new FormData();
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          let file = files.value
          const today = new Date();

          formData.append("employeeId", route.query.id)
          formData.append("timeOut", moment(String(today)).format('hh:mm A'))
          formData.append("LocationOut", location.value)
          formData.append("getdate", moment(String(today)).format('yyyy/MM/DD'))
          formData.append("workPlace", whatSite.value)
          formData.append("folder", route.query.folder)
          formData.append("fileName", route.query.fileName)
          formData.append("latLongOut", latlong.value)
          formData.append("uploadAttachments", file)

          await axios.post(`${rootLink.value}api/FcAttendances/uploadFileTimeOut`,
            formData, config).then(function (res) {
              if (res.status == "200") {
                firstload()
              } else {
                waiting.value = false
                aler(res.status);
              }

            }).catch(function (error) {
              alert(error)
              waiting.value = false
            })
        }



      },
        (error) => {
          alert("Failed to retrieve your location: " + error.message);
        },
        options
      )
    }
    else {
      alert("Geolocation is not supported by your browser")
    }



  }

}
</script>

<style scoped>
.location {
  display: flex;
  align-items: center;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
}


.version {
  display: flex;
}

.custom-button {
  padding: 0px 0px;
  background-color: transparent;
  border: 1px solid #000;
  cursor: pointer;
  height: 85px;
  width: 45%;
}

.total-time,
.version {
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.location {
  display: flex;
  align-items: center;
  justify-content: center;
}

.location i {
  margin-right: 5px;
}

.location span {
  font-weight: bold;
}
.row-container-whatSite {
  display: flex;
  justify-content: space-evenly;
}


</style>
