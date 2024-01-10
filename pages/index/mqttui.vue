<template>
	<view class="view">
		<view class="title">Connect</view>
		<text>Host</text>
		<input type="text" v-model="connection.host"/>
		<text>Port</text>
		<input type="text" v-model="connection.port"/>
		<text>Path</text>
		<input type="text" v-model="connection.path"/>
		<text>Client ID</text>
		<input type="text" :value="connection.clientId" disabled/>
		<text>Username</text>
		<input type="text" v-model="connection.username"/>
		<text>Password</text>
		<input type="password" v-model="connection.password"/>
		<text>Keep Alive</text>
		<input type="text" value="60"/>
		<view>
			<checkbox-group :values="selected" @change="handleCheckboxChange">
		    <checkbox value="CleanSession" checked>Clean Session&nbsp;</checkbox>
		    <checkbox value="SSL">SSL</checkbox>
		</checkbox-group>
		<text class="url">{{connection.protocol}}://{{connection.host}}:{{connection.port}}{{connection.path}}</text>
		</view>
		<view class="btn">
			<button class="btn1" @click="connectToMQTT" :disabled="btn1Disabled">Connect</button>
			<button class="btn2" @click="disconnect" :disabled="btn2Disabled">Disconnect</button>
		</view>
		<text class="state">Current State: <text id="statetext" :style="connectionStateStyle">{{connection.state}}</text></text>
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
	const selected = ref(['CleanSession', 'SSL']);
	const connectionStateStyle = ref(''); // 样式更改
	const btn1Disabled = ref(false); // 初始状态下连接按钮可点击
	const btn2Disabled = ref(true); // 初始状态下断开按钮不可点击
	var statetextelement; // 根据id获取操作元素
	var flag = ref(0);
	let protocal = "";
	//如你的链接是wss:则修改为wxs:,如果你的链接是ws:则修改为wx:
	// #ifdef H5
	protocal = "ws"
	flag.value = 1;
	// #endif
	// #ifdef MP-WEIXIN
	protocal = "wx"
	flag.value = 2;
	// #endif
	
	// 监听复选框的变化事件
	const handleCheckboxChange = (values) => {
		const selectedValues = values.detail.value; // 通过 values.detail 获取选中值的数组
		console.log('selected.value:', selected.value);
	  if (selectedValues.includes('SSL')) {
	    // SSL 被勾选，调用方法
	    change();
	  } else {
	    // SSL 不被勾选，调用方法
	    rechange();
	  }
	  if (selectedValues.includes('CleanSession')) {
	    // CleanSession 被勾选，调用方法
	    clean();
	  } else {
	    // CleanSession 不被勾选，调用方法
	    noclean();
	  }
	};
	const change = () => {
		if(flag.value === 1){
			connection.protocol = "wss"
		}else if(flag.value === 2){
			connection.protocol = "wxs"
		}
	};
	const rechange = () => {
		if(flag.value === 1){
			connection.protocol = "ws"
		}else if(flag.value === 2){
			connection.protocol = "wx"
		}
	};
	const clean = () => {
		connection.clean = true
	};
	const noclean = () => {
		connection.clean = false
	};
	const stylered = () => {
		if(flag.value == 1){
			statetextelement = document.getElementById("statetext");
			if (statetextelement) {
				statetextelement.style.color = "red";
			}
		}else if(flag.value == 2){
			connectionStateStyle.value = 'color: red;';
		}
	};
	const stylegreen = () => {
		if(flag.value == 1){
			statetextelement = document.getElementById("statetext");
			if (statetextelement) {
				statetextelement.style.color = "green";
			}
		}else if(flag.value == 2){
			connectionStateStyle.value = 'color: green;';
		}
	};
	const connection = reactive({
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
		state: ref("DISCONNECTED"),
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
						connection.state = "CONNECTED"; 
						stylegreen();
						console.log("connection successful");
						btn2Disabled.value = false;
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
				btn1Disabled.value = false;
				btn2Disabled.value = true;
			}
	};
	
	// 移除 onMounted 钩子，不再在组件挂载时自动创建 MQTT 连接
	// onMounted(() => {
	// 	createConnection();
	// })
	// 使用钩子设置样式
	onMounted(() => {
		stylered();
	});
	// 手动连接
	const connectToMQTT = () => {
		console.log("连接中...")
	    createConnection();
	};
	// 断开连接
	const disconnect = () => {
	  if (client.value.connected) {
	    try {
	      client.value.end();
	      // 在断开连接时更新状态
	      connection.state = "DISCONNECTED";
		  stylered();
	      console.log("Disconnected");
	      // 启用按钮
	      btn1Disabled.value = false;
		  btn2Disabled.value = true;
	    } catch (error) {
	      console.log("Error disconnecting:", error);
	    }
	  } else {
	    console.log("没有活动连接可断开");
	  }
	};
</script>

<style>
	.view {
		margin: 10px 0 0 20px;
	}
	.title {
		font-size: 20px;
		margin-bottom: 5px;
	}
	input {
		height: 20px;
		width: 90%;
		border: 1px black solid;
		border-radius: 5px;
		margin-bottom: 10px;
	}
	.url {
		color: green;
		font-size: 15px;
	}
	.btn {
		margin-top: 20px;
		display: flex;
	}
	button {
		height: 100%;
		width: 100px;
		margin-left: 0px;
		font-size: 15px;
		background-color: azure;
	}
	.btn2 {
		margin-left: -70px;
	}
</style>
