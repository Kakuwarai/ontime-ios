<template>

  <vue-basic-alert 
       :duration="300" 
       :closeIn="5000" 
       ref="alert" />

    <!-- <button @click="Test()">
      TEST BUTTON
    </button> -->

  <input class="file" type="file" id="files" ref="file" accept="image/*" capture="camera" @click="getElementIdClick()"
    v-on:change="handleFileUpload($event)" hidden>

  <div align="left">
    <span style="font-weight: bold;">Name:</span>
    <span :style="{ fontSize: '15px', color: '#00bbff' }">{{ route.query.name }}</span>
  </div>
  <div align="left">
    <span style="font-weight: bold;">Date: </span>
    <span :style="{ fontSize: '15px', color: '#00bbff' }">
      {{ new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }) }}
    </span>
  </div>
<div >
<!-- Time in loading -->
  <div v-if="loadingIn == true" :style="{
    width: '95%',
    height: `${w <= 376?'125px':'250px'}`,
    borderRadius: '10px',
    border: '1px solid black',
    // justifyContent:'left',
    margin:'0 auto',
    overflow: 'hidden',

    marginTop:'10px'
  }">

    <h2 :style="{marginTop: `${w <= 376?'20px':'120px'}`}" >{{ loadingTextIn }}</h2>

  </div>

<!-- Time in == '' -->
  <div v-if="timeIn == '' && loadingIn == false" :style="{
    width: '95%',
    height: `${w <= 376?'125px':'250px'}`,
    borderRadius: '10px',
    border: '1px solid black',
    overflow: 'hidden',
    margin:'0 auto',
    marginTop:'10px'
  }">


    <div class="box transform" style="background-color: #00bbff;" id="button" @click="timeInClick()">


      <div v-if="isItembuttonActive == true" :style="{paddingTop: `${w <= 376?'20px':'60px'}`}" style=" text-align: center;">
        <h1 :style="{ fontSize: `${w <= 376?'30px':'50px'}`}" style="color: #ffffff;">
          <i class="bi bi-stopwatch" :style="{ fontSize: `${w <= 376?'30px':'60px'}`}" style="color: #ffffff; "></i>
          Time In
        </h1>
      </div>

    </div>

    <div :style="{ paddingTop: `${w <= 376?'20px':'80px'}`}" style="display: flex; justify-content: space-evenly; ">
      <button style="width: 30%; height: 100px; background-color: white; border: 2px solid #00bbff"
        @click="isTimeInOfficeWFHOBT('in', 'Office')">
        <img src="..\assets\Images\office.png" height="57">
        <span style="color: #00bbff;font-weight: bold;">OFFICE</span>
      </button>
      <button style="width: 30%; height: 100px; background-color: white; border: 2px solid #00bbff"
        @click="isTimeInOfficeWFHOBT('in', 'WFH')">
        <img src="..\assets\Images\WFH.png" height="57">
        <span style="color: #00bbff;font-weight: bold;">WFH</span>
      </button>
      <button style="width: 30%; height: 100px; background-color: white; border: 2px solid #00bbff"
        @click="isTimeInOfficeWFHOBT('in', 'OBT')">
        <img src="..\assets\Images\Site.png" height="57">
        <span style="color: #00bbff;font-weight: bold;">OBT</span>
      </button>
    </div>

  </div>

<!-- Time in != '' -->
  <div v-if="timeIn != '' && loadingIn == false" :style="{
    width: '95%',
    height: `${w <= 376?'125px':'250px'}`,
    borderRadius: '10px',
    border: '1px solid black',
    // justifyContent:'left',
    overflow: 'hidden',
    margin:'0 auto',
    paddingBottom:'10px',
    marginTop:'10px'
  }">

    <p v-if="timeIn != '' && loadingIn == false" align="left" style="margin-left: 10px;font-weight: lighter;"><Span style="color: #00bbff;font-weight: bold;">Time in:</Span> {{ timeIn
    }}</p>


    <img v-if="w > 376" style="margin: 0 auto;"
      :src="`https://apps.fastlogistics.com.ph/fastdrive//ontimemobile/${route.query.id}/${moment(String(new Date())).format('yyyy DD MM').toString()}/${timeIn.replace(':', '').replace(' ', '')}${route.query.id}.jpg`"
      height="120">



    <div align="left" style="margin-left: 10px;">
     <p style="font-size: 12px;"> <i class="bi bi-geo-alt-fill" style="color: #00bbff; fontSize: 15px;"></i> {{ locationIn }}</p>
    </div>
    <div align="left" style="margin-left: 10px;">
    <p style="font-size: 12px;">  <i class="bi bi-briefcase-fill" style="color: #00bbff; fontSize: 15px;"></i> {{ workPlace ==
        "Office" ? "Office" : workPlace == "WFH" ? "Work From Home" : "Official Business Travel" }}</p>
    </div>
  </div>

 <!-- time out Loading -->
  <div v-if="loadingOut == true" :style="{
    width: '95%',
    height: `${w <= 376?'125px':'250px'}`,
    borderRadius: '10px',
    border: '1px solid black',
    // justifyContent:'left',
    overflow: 'hidden',
    margin:'0 auto',
    marginTop:'10px'
  }">

    <h2 :style="{marginTop: `${w <= 376?'20px':'120px'}`}" >{{ loadingTextOut }}</h2>

  </div>

  <!-- time out == '' -->
  <div v-if="timeOut == '' && loadingOut == false" :style="{
    width: '95%',
    height: `${w <= 376?'125px':'250px'}`,
    borderRadius: '10px',
    border: '1px solid black',
    margin:'0 auto',
    overflow: 'hidden',
    marginTop:'10px'
  }">


    <div class="box transform2" style="background-color: red;" id="button" @click="timeOutClick()">


      <div v-if="isItembuttonActiveOut == true" :style="{paddingTop: `${w <= 376?'20px':'60px'}`}"  style="text-align: center;">
        <h1 :style="{ fontSize: `${w <= 376?'30px':'50px'}`}" style="color: #ffffff; ">
          <i class="bi bi-stopwatch-fill" :style="{ fontSize: `${w <= 376?'30px':'60px'}`}" style="color: #ffffff;"></i>
          Time Out
        </h1>
      </div>

    </div>

    <div :style="{ paddingTop: `${w <= 376?'20px':'80px'}`}" style="display: flex; justify-content: space-evenly; ">
      <button style="width: 30%; height: 100px; background-color: white; border: 2px solid #00bbff"
        @click="isTimeInOfficeWFHOBT('out', 'Office')">
        <img src="..\assets\Images\office.png" height="57">
        <span style="color: #00bbff;font-weight: bold;">OFFICE</span>
      </button>
      <button style="width: 30%; height: 100px; background-color: white; border: 2px solid #00bbff"
        @click="isTimeInOfficeWFHOBT('out', 'WFH')">
        <img src="..\assets\Images\WFH.png" height="57">
        <span style="color: #00bbff;font-weight: bold;">WFH</span>
      </button>
      <button style="width: 30%; height: 100px; background-color: white; border: 2px solid #00bbff"
        @click="isTimeInOfficeWFHOBT('out', 'OBT')">
        <img src="..\assets\Images\Site.png" height="57">
        <span style="color: #00bbff;font-weight: bold;">OBT</span>
      </button>
    </div>

  </div>

  <!-- Time out != '' -->
  <div v-if="timeOut != '' && loadingOut == false" :style="{
    width: '95%',
    height: `${w <= 376?'125px':'250px'}`,
    borderRadius: '10px',
    border: '1px solid black',
    margin:'0 auto',
    // justifyContent:'left',
    paddingBottom:'10px',
    overflow: 'hidden',
    marginTop:'10px'
  }">

    <p v-if="timeOut != '' && loadingOut == false" align="left" style="margin-left: 10px;font-weight: lighter;"><Span style="color: #00bbff;font-weight: bold;">Time out:</Span> {{ timeOut
    }}</p>


    <img v-if="w > 376" style="margin: 0 auto;"
      :src="`https://apps.fastlogistics.com.ph/fastdrive//ontimemobile/${route.query.id}/${moment(String(new Date())).format('yyyy DD MM').toString()}/${timeOut.replace(':', '').replace(' ', '')}${route.query.id}.jpg`"
      height="120">



    <div align="left" style="margin-left: 10px;">
      <p style="font-size: 12px;"><i class="bi bi-geo-alt-fill" style="color: #00bbff; fontSize: 15px;"></i> {{ locationOut }}
      </p></div>
    <div align="left" style="margin-left: 10px;">
      <p style="font-size: 12px;"><i class="bi bi-briefcase-fill" style="color: #00bbff; fontSize: 15px;"></i> {{ workPlaceOut ==
        "Office" ? "Office" : workPlaceOut == "WFH" ? "Work From Home" : "Official Business Travel" }} </p>
    </div>
  </div>

  <!-- total time div -->

  <div :style="{
    width: '95%',
    height: '85px',
    // justifyContent:'left',
    overflow: 'hidden',
    margin:'0 auto',
  }">

    <h3 style="margin-left: 10px;font-weight: lighter;" align = 'left'><Span style="color: #00bbff;font-weight: bold;">Total time: </Span>{{ totalTime }}</h3>

    <p align="right" style="margin-right: 10px;margin-bottom: 5px;"><span style="color: #00bbff;font-weight: bold;">Version: </span>IOS 1.3.7</p>
  </div>
</div>

  <!-- Modal -->
  <div>
    <modal v-if="timeInOutConfirmation" @close="timeInOutConfirmation = false">
      <slot>
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container" id="divEdit">
              <div class="modal-header">
                <slot name="header">
                  <h1 style="color:#00bbff ;">{{ whatWorkPlace == "Office"?"Office": whatWorkPlace == "WFH"?"Work From Home":"Official Business Travel"}}</h1>
                </slot>
              </div>
              <div class="modal-body">
                <slot>
                  <h3 style="font-weight: lighter;">Are you sure you want to Time {{isTimeInOrOut}}?</h3>
                </slot>
              </div>
              <div class="modal-footer">
                <button class="modal-default-button" style=" width: 100px;font-size: 20px;"
                 @click="toggleCamera()">
                  Yes
                </button>
                <button class="modal-default-button" style="background-color: red; width: 100px;font-size: 20px;"
                  @click="buttonForYesOrNo()">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </modal>
  </div>


  
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// import {hello} from '../components/functions.js'
import { useRoute } from 'vue-router';
import moment from 'moment'
import VueBasicAlert from 'vue-basic-alert'

const rootLink = ref("https://apps.fastlogistics.com.ph/omapi/"),
  //  const rootLink = ref("https://localhost:7284/"),
  isItembuttonActive = ref(true),
  isItembuttonActiveOut = ref(true),
  latlong = ref(''),
  location = ref(''),
  whatWorkPlace = ref(''),
  timeInOutConfirmation = ref(false),
  isTimeInOrOut = ref(''),
  route = useRoute(),
  files = ref(),
  canvasRef = ref(null),
  timeIn = ref(''),
  workPlace = ref(''),
  locationIn = ref(''),
  workPlaceOut = ref(''),
  timeOut = ref(''),
  locationOut = ref(''),
  totalTime = ref(''),
  loadingIn = ref(false),
  loadingTextIn = ref('Checking attendance...'),
  loadingOut = ref(false),
  loadingTextOut = ref('Checking attendance...'),
  nominatimTest = ref(''),
  alert = ref(null),
  currentTime = ref(),
  timeZoneGMT = ref(new Date().getTimezoneOffset() / -60)

// async function Test(){
//   const options = {
//     enableHighAccuracy: true,
//     accuracy: { desiredAccuracy: 1 },
//     // Set desired accuracy in meters
//   }
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       nominatimTest.value = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)

//       if (nominatimTest.value.status == "200") {
//         var timeZoneGMT = new Date().getTimezoneOffset() / -60;

    
//        console.log(timeZoneGMT);
//       } 
//       else{
//         alert(nominatimTest.value.status)
//       }



//     },
//       (error) => {
//         alert("Failed to retrieve your location: " + error.message);
//       },
//       options
//     )
//   }
//   else {
//     alert("Geolocation is not supported by your browser")
//   }
// }
const w = ref()
onMounted(() => {
  window.addEventListener('resize', onResize);

w.value = window.innerWidth

console.log(w.value);
  canvasRef.value = document.querySelector('canvas');
  GettingUserAttendance()
  // console.log(hello());
 
})
function onResize() {
    w.value = window.innerWidth

}
async function GettingUserAttendance() {
  // console.log("this: "+files.value);
  loadingIn.value = true
  loadingTextIn.value = "Checking attendance..."
  loadingOut.value = true
  loadingTextOut.value = "Checking attendance..."

  let formData = new FormData();
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const today = new Date();
  formData.append("employeeId", route.query.id)
  formData.append("getDate", moment(String(today)).format('yyyy/MM/DD'))

  await axios.post(`${rootLink.value}api/FcAttendances/gettimeinoutSiteNew1`,
    formData, config).then(function (res) {
      if (res.status == "200") {

        timeIn.value = res.data[0].timeIn;
        if (res.data[0].locationIn != null) {
          workPlace.value = res.data[0].workPlace;
          locationIn.value = res.data[0].locationIn;
        }

        if (res.data[0].timeOut != null) {
          workPlaceOut.value = res.data[0].workPlaceOut;
          timeOut.value = res.data[0].timeOut;
          locationOut.value = res.data[0].locationOut;
          totalTime.value = res.data[0].totalTime;
        }
        loadingIn.value = false
        loadingOut.value = false

      } else if (res.status == "202"){
        loadingIn.value = false
        loadingOut.value = false
      }else {
        loadingIn.value = false
        loadingOut.value = false
        alert.value.showAlert(
            'error', // There are 4 types of alert: success, info, warning, error
            res.status, //mesage
            'Error'// Header of the alert
        ) 

      }

    }).catch(function (error) {
      loadingIn.value = false
      loadingOut.value = false
      alert.value.showAlert(
            'error', // There are 4 types of alert: success, info, warning, error
            error, //mesage
            'Error'// Header of the alert
        ) 

    })
}


function buttonForYesOrNo(){
  loadingIn.value = false
  loadingOut.value = false
  timeInOutConfirmation.value = false
}

function isTimeInOfficeWFHOBT(selectedTime, selectedWorkplace) {

  if(selectedTime == "in"){
    isItembuttonActive.value = true;
     loadingIn.value = true
     loadingTextIn.value = "Processing image..."
  }else if(selectedTime == "out"){
    isItembuttonActiveOut.value = true
     loadingOut.value = true
     loadingTextOut.value = "Processing image..."
  }

  isTimeInOrOut.value = selectedTime;
  whatWorkPlace.value = selectedWorkplace
  timeInOutConfirmation.value = true;
}
async function toggleCamera() {

  timeInOutConfirmation.value = false
  document.getElementById("files").click()



}
  
async function getElementIdClick(){


    let formData = new FormData();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }


        formData.append("timeZ", timeZoneGMT.value)

        await axios.post(`${rootLink.value}api/FcAttendances/getTimeZoneT`,
          formData, config).then(function (res) {



if(res.status == 200){
  currentTime.value = res.data
  console.log(currentTime.value);
}else{
  loadingOut.value = false
    loadingTextOut.value = ""
    alert.value.showAlert(
            'error', // There are 4 types of alert: success, info, warning, error
            'Connection Failed', //mesage
            'Error'// Header of the alert
        ) 
}


          }).catch(function (error) {
            loadingOut.value = false
    loadingTextOut.value = ""
            alert.value.showAlert(
            'error', // There are 4 types of alert: success, info, warning, error
            error, //mesage
            'Error'// Header of the alert
        ) 
           
          })

       
  
  
}

async function handleFileUpload(event) {

  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const compressedImage = await compressImage(file);
    files.value = compressedImage;
    // imageURL.value = URL.createObjectURL(compressedImage);

    if (isTimeInOrOut.value == "in") {
      loadingIn.value = true
    loadingTextIn.value = "Processing image..."
   
      handleTimeIn()
    } else if (isTimeInOrOut.value == "out") {

    loadingOut.value = true
    loadingTextOut.value = "Processing image..."
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


function timeInClick(){
  var box = document.querySelector('.transform');
  box.classList.toggle('transform-active');
  isItembuttonActive.value = false
}

function timeOutClick(){
  var box = document.querySelector('.transform2');
  box.classList.toggle('transform2-active');
  isItembuttonActiveOut.value = false
}

// document.addEventListener('DOMContentLoaded', function () {
//   var button = document.getElementById('button');
//   var box = document.querySelector('.transform');

//   button.addEventListener('click', function () {
//     box.classList.toggle('transform-active');
//     isItembuttonActive.value = false

//   });
// });


async function handleTimeIn() {
  loadingTextIn.value = "Processing location..."
  loadingTextOut.value = "Processing location..."

  const options = {
    enableHighAccuracy: true,
    accuracy: { desiredAccuracy: 1 },
    // Set desired accuracy in meters
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      // nominatimTest.value = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)

      // if (nominatimTest.value.status == "200") {
        // const temp = ref((await nominatimTest.value.data['display_name']).split(','))
        // location.value = `${temp.value[0]} ${temp.value[1]} ${temp.value[2]} ${temp.value[3]} ${temp.value[4]} ${temp.value[5]}`
        latlong.value = `${position.coords.latitude}-${position.coords.longitude}`
       
        loadingTextIn.value = "Processing attendance..."
        loadingTextOut.value = "Processing attendance..."

        let formData = new FormData();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let file = files.value
        const today = new Date();
        
        formData.append("timeZoneGMT", timeZoneGMT.value)
        formData.append("employeeId", route.query.id)
        formData.append("workPlace", whatWorkPlace.value)
        formData.append("TimeIn", moment(String(today)).format('hh:mm A'))
        formData.append("LocationIn", location.value)
        formData.append("department", route.query.department)
        formData.append("sbu", route.query.sbu)
        formData.append("date", moment(String(today)).format('yyyy/MM/DD'))
        formData.append("folder", route.query.folder)
        formData.append("fileName", route.query.fileName)
        formData.append("LatLongIn", latlong.value)
        formData.append("uploadAttachments", file)

        await axios.post(`${rootLink.value}api/FcAttendances/uploadFile2`,
          formData, config).then(function (res) {
            //console.log("this: " + res.data);
            if (res.status == "200") {
              GettingUserAttendance()
              alert.value.showAlert(
            'success', // There are 4 types of alert: success, info, warning, error
            res.data, //mesage
            'Success'// Header of the alert
        ) 
            } else {
              alert.value.showAlert(
            'error', // There are 4 types of alert: success, info, warning, error
            res.data, //mesage
            'Error'// Header of the alert
        ) 
              loadingIn.value = false
            }

          }).catch(function (error) {
            alert.value.showAlert(
            'error', // There are 4 types of alert: success, info, warning, error
            error, //mesage
            'Error'// Header of the alert
        ) 
            loadingIn.value = false
          })
      // }
      // else{
      //   alert(nominatimTest.value.status)
      // }



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


async function handleTimeOut() {
  loadingTextIn.value = "Processing location..."
  loadingTextOut.value = "Processing location..."
  const options = {
      enableHighAccuracy: true,
      accuracy: { desiredAccuracy: 1 },
      // Set desired accuracy in meters
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        // nominatimTest.value = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)

        // if (nominatimTest.value.status == "200") {
        //   const temp = ref((await nominatimTest.value.data['display_name']).split(','))
        //   location.value = `${temp.value[0]} ${temp.value[1]} ${temp.value[2]} ${temp.value[3]} ${temp.value[4]} ${temp.value[5]}`
          latlong.value = `${position.coords.latitude}-${position.coords.longitude}`

          loadingTextIn.value = "Processing attendance..."
        loadingTextOut.value = "Processing attendance..."

          let formData = new FormData();
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          let file = files.value
          const today = new Date();

          formData.append("employeeId", route.query.id)
          formData.append("timeOut", currentTime.value)
          formData.append("LocationOut", 'temp')
          formData.append("timeZoneGMT", currentTime.value),
          formData.append("getdate", moment(String(today)).format('yyyy/MM/DD'))
          formData.append("workPlaceOut", whatWorkPlace.value)
          formData.append("folder", route.query.folder)
          formData.append("fileName", route.query.fileName)
          formData.append("latLongOut", latlong.value)
          formData.append("uploadAttachments", file)

          await axios.post(`${rootLink.value}api/FcAttendances/uploadFileTimeOut2`,
            formData, config).then(function (res) {
              if (res.status == "200") {
              GettingUserAttendance()
              alert.value.showAlert(
            'success', // There are 4 types of alert: success, info, warning, error
            res.data, //mesage
            'Success'// Header of the alert
        ) 
            } else {
              alert.value.showAlert(
            'error', // There are 4 types of alert: success, info, warning, error
            res.data, //mesage
            'Error'// Header of the alert
        ) 
              loadingOut.value = false
            }

            }).catch(function (error) {
              alert.value.showAlert(
            'error', // There are 4 types of alert: success, info, warning, error
            error, //mesage
            'Error'// Header of the alert
        )
              loadingOut.value = false
            })
        // }



      },
        (error) => {
          alert.value.showAlert(
            'error', // There are 4 types of alert: success, info, warning, error
            "Failed to retrieve your location: " + error.message, //mesage
            'Error'// Header of the alert
        ) 
 
        },
        options
      )
    }
    else {
      alert("Geolocation is not supported by your browser")
    }
}

</script>

  
<style scoped>
.box {
  text-align: center;
  height: 250px;
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px solid black;
}

.transform {
  transition: all 2s ease;
}

.transform-active {
  background-color: transparent;
  height: 0px;
  border: 0px solid transparent;
}

.transform2 {
  transition: all 2s ease;
}

.transform2-active {
  background-color: transparent;
  height: 0px;
  border: 0px solid transparent;
}

/* next */

.modal-mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  z-index: 2000;
  margin: 0px auto;
  padding: 20px 30px;
  width: 80%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-bottom: 20px;
  border: none;
}

.modal-body {
  border: none;
  margin-bottom: 10px;
}

.modal-footer {
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}

.modal-default-button {
  margin-left: 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 2px;
  padding: 6px 12px;
  font-size: 14px;
  width: 50px;
  height: 50px;
  cursor: pointer;
}</style>
  

  https://apps.fastlogistics.com.ph/fastdrive//ontimemobile/EMLOYEEID/DATE(yyyy DD MM)/TIME(12:00)EMPLPEEID.jpg`"