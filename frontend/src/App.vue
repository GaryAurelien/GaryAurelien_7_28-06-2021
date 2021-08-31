<template>
<main>
<router-view/>
</main>
</template>

<style >
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
  text-align: center;

}
body {
  margin-bottom: 100px;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
.card {
  max-width: 100%;
  display: flex;
  align-content: center;
  width: 540px;
  background-color: #e0e0e0;
  border-radius: 16px;
  padding:32px;
}
.card_title {
  text-align:center;
  font-weight: 600;
}
.card_subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}
  .button_login, .button_create {
    background: #091f43;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }
  .card_action {
    color:#091f43;
    text-decoration: underline;
  }
  .card_action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor:pointer;
    background: #091f43;
  }
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }

</style>
