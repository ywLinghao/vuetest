<template>
	<view>
		mqtt测试
	</view>
</template>

<script setup>
	import * as mqtt from 'mqtt/dist/mqtt.js';
	import {
		reactive,
		ref,
		onMounted
	} from "vue";

	// https://github.com/mqttjs/MQTT.js#qos
	const qosList = [0, 1, 2];
	let client = ref({
		connected: false
	});
	const receivedMessages = ref("");
	const subscribedSuccess = ref(false);
	const btnLoadingType = ref("");
	const retryTimes = ref(0);

	let protocal = "";
	//如你的链接是wss:则修改为wxs:,如果你的链接是ws:则修改为wx:
	// #ifdef H5
	protocal = "ws"
	// #endif
	// #ifdef MP-WEIXIN
	protocal = "wx"
	// #endif
	const connection = reactive({
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
		connectTimeout: 30 * 1000, // ms
		reconnectPeriod: 4000, // ms
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

			/**
			 * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
			 * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
			 * 
			 * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
			 * which should be specified when connecting, and the path used on EMQX is /mqtt.
			 * 
			 * for more details about "mqtt.connect" method & options,
			 * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
			 */
			client.value = mqtt.connect(connectUrl, options);

			if (client.value.on) {
				// https://github.com/mqttjs/MQTT.js#event-connect
				client.value.on("connect", () => {
					btnLoadingType.value = "";
					console.log("connection successful");
				});

				// https://github.com/mqttjs/MQTT.js#event-reconnect
				client.value.on("reconnect", handleOnReConnect);

				// https://github.com/mqttjs/MQTT.js#event-error
				client.value.on("error", (error) => {
					console.log("connection error:", error);
				});

				// https://github.com/mqttjs/MQTT.js#event-message
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

	onMounted(() => {
		createConnection();
	})
</script>

<style>

</style>