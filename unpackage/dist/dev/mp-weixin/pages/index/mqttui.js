"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mqttui",
  setup(__props) {
    let client = common_vendor.ref({
      connected: false
    });
    const receivedMessages = common_vendor.ref("");
    common_vendor.ref(false);
    const btnLoadingType = common_vendor.ref("");
    const retryTimes = common_vendor.ref(0);
    const selected = common_vendor.ref(["CleanSession", "SSL"]);
    const connectionStateStyle = common_vendor.ref("");
    const btn1Disabled = common_vendor.ref(false);
    const btn2Disabled = common_vendor.ref(true);
    var statetextelement;
    var flag = common_vendor.ref(0);
    let protocal = "";
    protocal = "wx";
    flag.value = 2;
    const handleCheckboxChange = (values) => {
      const selectedValues = values.detail.value;
      console.log("selected.value:", selected.value);
      if (selectedValues.includes("SSL")) {
        change();
      } else {
        rechange();
      }
      if (selectedValues.includes("CleanSession")) {
        clean();
      } else {
        noclean();
      }
    };
    const change = () => {
      if (flag.value === 1) {
        connection.protocol = "wss";
      } else if (flag.value === 2) {
        connection.protocol = "wxs";
      }
    };
    const rechange = () => {
      if (flag.value === 1) {
        connection.protocol = "ws";
      } else if (flag.value === 2) {
        connection.protocol = "wx";
      }
    };
    const clean = () => {
      connection.clean = true;
    };
    const noclean = () => {
      connection.clean = false;
    };
    const stylered = () => {
      if (flag.value == 1) {
        statetextelement = document.getElementById("statetext");
        if (statetextelement) {
          statetextelement.style.color = "red";
        }
      } else if (flag.value == 2) {
        connectionStateStyle.value = "color: red;";
      }
    };
    const stylegreen = () => {
      if (flag.value == 1) {
        statetextelement = document.getElementById("statetext");
        if (statetextelement) {
          statetextelement.style.color = "green";
        }
      } else if (flag.value == 2) {
        connectionStateStyle.value = "color: green;";
      }
    };
    const connection = common_vendor.reactive({
      // ws or wss
      protocol: protocal,
      host: "jqrjq.cn",
      // ws -> 8083; wss -> 8084
      port: 8083,
      path: "/mqtt",
      clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8),
      /**
       * By default, EMQX allows clients to connect without authentication.
       * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
       */
      username: "",
      password: "",
      state: common_vendor.ref("DISCONNECTED"),
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
          btn1Disabled.value = false;
        }
      }
    };
    const createConnection = () => {
      connection.state = "CONNECTING";
      btn1Disabled.value = true;
      try {
        const {
          protocol,
          host,
          port,
          path,
          ...options
        } = connection;
        const connectUrl = `${protocol}://${host}:${port}${path}`;
        client.value = common_vendor.mqttExports.connect(connectUrl, options);
        if (client.value.on) {
          client.value.on("connect", () => {
            btnLoadingType.value = "";
            connection.state = "CONNECTED";
            stylegreen();
            console.log("connection successful");
            btn2Disabled.value = false;
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
        btn1Disabled.value = false;
        btn2Disabled.value = true;
      }
    };
    common_vendor.onMounted(() => {
      stylered();
    });
    const connectToMQTT = () => {
      console.log("连接中...");
      createConnection();
    };
    const disconnect = () => {
      if (client.value.connected) {
        try {
          client.value.end();
          connection.state = "DISCONNECTED";
          stylered();
          console.log("Disconnected");
          btn1Disabled.value = false;
          btn2Disabled.value = true;
        } catch (error) {
          console.log("Error disconnecting:", error);
        }
      } else {
        console.log("没有活动连接可断开");
      }
    };
    return (_ctx, _cache) => {
      return {
        a: connection.host,
        b: common_vendor.o(($event) => connection.host = $event.detail.value),
        c: connection.port,
        d: common_vendor.o(($event) => connection.port = $event.detail.value),
        e: connection.path,
        f: common_vendor.o(($event) => connection.path = $event.detail.value),
        g: connection.clientId,
        h: connection.username,
        i: common_vendor.o(($event) => connection.username = $event.detail.value),
        j: connection.password,
        k: common_vendor.o(($event) => connection.password = $event.detail.value),
        l: selected.value,
        m: common_vendor.o(handleCheckboxChange),
        n: common_vendor.t(connection.protocol),
        o: common_vendor.t(connection.host),
        p: common_vendor.t(connection.port),
        q: common_vendor.t(connection.path),
        r: common_vendor.o(connectToMQTT),
        s: btn1Disabled.value,
        t: common_vendor.o(disconnect),
        v: btn2Disabled.value,
        w: common_vendor.t(connection.state),
        x: common_vendor.s(connectionStateStyle.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Project/Vue/uniapp-vue3-ui-master/pages/index/mqttui.vue"]]);
wx.createPage(MiniProgramPage);
