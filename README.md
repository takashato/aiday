# Aiday
An online chat application.
## Introduction
### What is "Aiday"?
Aiday (ai đấy? - who's there?) is an online chat application & platform based on server-client model.
### Technology
1. **Client application**
	- **React Native** framework (for Android and iOS)
	- **UI Kitten** framework for React Native
	- **SocketIO** client - a network library based on WebSocket
	- ...
2. **Server application**
	- **HapiJS** - web / api server framework
	- **SequelizeJS** - javascript ORM
	- **MySQL**
	- **SocketIO** server
### Our Team
- Bành Thanh Sơn - [@takashato](//github.com/takashato)
- Phạm Trần Chính - [@PTChinh](//github.com/PTChinh)
- Trần Hiệp Nguyên Huy - [@tranhiepnguyenhuy1999](//github.com/tranhiepnguyenhuy1999)
## Install & build
### Source structure
- root
	- server - *server module*
	- mobile - *mobile module*
### Usage
We have built instant-used packed app, they was posted in [Release section](https://github.com/takashato/aiday/releases) of this repo.
Be noticed that this app will connect to **our server**.
### Build it your self
1. Clone this repo to your local storage 
`git clone https://github.com/takashato/aiday.git`
2. Create a database and import the file `./aiday.sql`
3. Open the directory of this repo in **Intellij** or any IDE.
4. Edit `./server/config/db.json` to match your database credential.
	Edit `./server/config/server.json` for server configs.
5. Get dependencies:
	Type following commands:
	```
	cd server && npm install
	cd ../client && npm install
	```
6. Start server:
	- Start server for development purporse:
	Type command: `cd server && npm start-dev`
	- Build server:
	1. Type command: `cd server && npm build`
	2. Copy `./node_modules` `./package.json` `.src/config/*` to `./dist` directory.
	3. Type command: `cd server && npm start`
7. Start application:
	1. Edit `./mobile/lib/config.json` to your server config...
	2. Run application:
		- Release Build for Android:
			1. Type command: `cd ./mobile/android && gradle assembleRelease`
			2. Install this built .apk in your mobile device: `./mobile/android/app/build/outputs/apk/release`
		- Development for Android:
			1. Type command: `cd ./mobile && react-native run-android`
## Contact
If you face any problem during the installation, please contact us by the information provided above.
Contributions are welcomed.
