"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mqtt",
  setup(__props) {
    let client = common_vendor.ref({
      connected: false
    });
    const receivedMessages = common_vendor.ref("");
    common_vendor.ref(false);
    const btnLoadingType = common_vendor.ref("");
    const retryTimes = common_vendor.ref(0);
    let protocal = "";
    protocal = "wx";
    const connection = common_vendor.reactive({
      // ws or wss
      protocol: protocal,
      host: "jqrjq.cn",
      // ws -> 8083; wss -> 8084
      port: 8083,
      clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8),
      /**
       * By default, EMQX allows clients to connect without authentication.
       * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
       */
      username: "admin",
      password: "public",
      clean: true,
      connectTimeout: 30 * 1e3,
      // ms
      reconnectPeriod: 4e3
      // ms
      // for more options and details, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
    });
    const handleOnReConnect = () => {
      retryTimes.value += 1;
      if (retryTimes.value > 5) {
        try {
          client.value.end();
          initData();
          console.log("connection maxReconnectTimes limit, stop retry");
        } catch (error) {
          console.log("handleOnReConnect catch error:", error);
        }
      }
    };
    const createConnection = () => {
      try {
        const {
          protocol,
          host,
          port,
          ...options
        } = connection;
        const connectUrl = `${protocol}://${host}:${port}/mqtt`;
        client.value = common_vendor.mqttExports.connect(connectUrl, options);
        if (client.value.on) {
          client.value.on("connect", () => {
            btnLoadingType.value = "";
            console.log("connection successful");
          });
          client.value.on("reconnect", handleOnReConnect);
          client.value.on("error", (error) => {
            console.log("connection error:", error);
          });
          client.value.on("message", (topic, message) => {
            receivedMessages.value = receivedMessages.value.concat(
              message.toString()
            );
            console.log(`received message: ${message} from topic: ${topic}`);
          });
        }
      } catch (error) {
        console.log("mqtt.connect error:", error);
      }
    };
    common_vendor.onMounted(() => {
      createConnection();
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Project/Vue/uniapp-vue3-ui-master/pages/index/mqtt.vue"]]);
wx.createPage(MiniProgramPage);
