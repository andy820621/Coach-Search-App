import { createApp, defineAsyncComponent } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import BaseCard from "./components/ui/BaseCard.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Avoid UserAuth refs can't get dom elements because dynamically import BaseCard component.
app.component("BaseCard", BaseCard);
// register global UI Async components
app.component(
	"BaseButton",
	defineAsyncComponent(() => import("./components/ui/BaseButton.vue"))
);
app.component(
	"BaseBadge",
	defineAsyncComponent(() => import("./components/ui/BaseBadge.vue"))
);
app.component(
	"BaseLoader",
	defineAsyncComponent(() => import("@/components/ui/BaseLoader.vue"))
);
app.component(
	"BaseDialog",
	defineAsyncComponent(() => import("@/components/ui/BaseDialog.vue"))
);

app.mount("#app");
