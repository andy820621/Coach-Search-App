import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import global UI components
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// register global UI components
app.component("BaseCard", BaseCard);
app.component("BaseButton", BaseButton);
app.component("BaseBadge", BaseBadge);

app.mount("#app");
