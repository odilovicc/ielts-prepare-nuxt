<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(async () => {
  try {
    const theme = localStorage.getItem("theme");
    const element = document.querySelector("html");
    if (theme === "dark") {
      element.classList.add("app-dark");
    } else {
      localStorage.setItem("theme", "light");
      element.classList.remove("app-dark");
    }
    await waitForData();
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
<!-- 
fetch("https://web-student.inter-nation.uz/api/api", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "timeout": "5000",
    "user-authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ0b2tlbiI6InR0LVlSTGhSMTFqNFFheDZwQnlhY3JtRVRCX1ZRRHZFIiwidXNlcl9pZCI6MTMyNDQzLCJyb2xlX2lkIjo1MSwiYnJhbmNoX2lkIjpudWxsLCJjb21wYW55X2lkIjoxLCJwcm9qZWN0IjoibG1zIiwiZXhwaXJlc19hdCI6MTcyMTI1NDg1NywicGFyYW1zIjp7ImF1dGhfa2V5IjoiTWswazdBZWNnNWEwIn0sImxvZ2luX3RpbWUiOjE3MjEyMjYwNTd9.iCYj4BbktwORSgaZ-DprveUH-oWkHjjiL0LGWkexMvyWeYOe8KveYU9HXDPDlsypb29NvEmHt4N5wpcLV-pMQsISNM0U-9s5cVDL0-oI3MrIZsRU6LijAEUZYhYnQUWaPISgMqJjpMQj0SWwoHDJ9ktKB8rGElz78Gw7rHJqc_2gRM505uKHCsB2feDLSBXKO5dRjqNqCZzMNz1JYexGNF4l7dGzGCgskdXkI6XPreUV67esBpaiq2yp6m7LI6D385j5R3IBypvC0tTyKrK_B22cbzbbT1rCNB4vlrX7UR1dP2e2MjlHY77RQ7Ci3eQeHO2hd0HpXQaPiNUlE4rNoHE4I8tbbS0s92WSsgZVYB5QBc4wawXE19rN736B3T9c9dt0TNL5TClF17ZaYBugsykETR4v1F6cntS800QWR8h9Pu5y9Lojv9YiselmPeBC5rD1HW37sCsKgHL_O3ii57NO77apLppZDXhvqMy68_rYui7MntMmshcFYwmmHAjH"
  },
  "referrer": "https://web-student.inter-nation.uz/auth/global-login?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ0b2tlbiI6InR0LVlSTGhSMTFqNFFheDZwQnlhY3JtRVRCX1ZRRHZFIiwidXNlcl9pZCI6MTMyNDQzLCJyb2xlX2lkIjo1MSwiYnJhbmNoX2lkIjpudWxsLCJjb21wYW55X2lkIjoxLCJwcm9qZWN0IjoibG1zIiwiZXhwaXJlc19hdCI6MTcyMTI1NDg1NywicGFyYW1zIjp7ImF1dGhfa2V5IjoiTWswazdBZWNnNWEwIn0sImxvZ2luX3RpbWUiOjE3MjEyMjYwNTd9.iCYj4BbktwORSgaZ-DprveUH-oWkHjjiL0LGWkexMvyWeYOe8KveYU9HXDPDlsypb29NvEmHt4N5wpcLV-pMQsISNM0U-9s5cVDL0-oI3MrIZsRU6LijAEUZYhYnQUWaPISgMqJjpMQj0SWwoHDJ9ktKB8rGElz78Gw7rHJqc_2gRM505uKHCsB2feDLSBXKO5dRjqNqCZzMNz1JYexGNF4l7dGzGCgskdXkI6XPreUV67esBpaiq2yp6m7LI6D385j5R3IBypvC0tTyKrK_B22cbzbbT1rCNB4vlrX7UR1dP2e2MjlHY77RQ7Ci3eQeHO2hd0HpXQaPiNUlE4rNoHE4I8tbbS0s92WSsgZVYB5QBc4wawXE19rN736B3T9c9dt0TNL5TClF17ZaYBugsykETR4v1F6cntS800QWR8h9Pu5y9Lojv9YiselmPeBC5rD1HW37sCsKgHL_O3ii57NO77apLppZDXhvqMy68_rYui7MntMmshcFYwmmHAjH",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"project\":\"lms-v2\",\"action\":\"client_student_profile_details\",\"query_params\":{\"expand\":\"is_other_online_payment_service_active,group.level.parent,group.lessonTime,group.groupType,group.level.parent.children\"}}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
-->