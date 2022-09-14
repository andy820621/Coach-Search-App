import { createApp, defineAsyncComponent } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// import global UI Async components
app.component(
	"BaseCard",
	defineAsyncComponent(() => import("./components/ui/BaseCard.vue"))
);
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
