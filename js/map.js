// ページの読み込みを待つ
window.addEventListener('load', init);
	
function init(){
	// サイズを指定
    const Width = window.innerWidth;
    const Height = window.innerHeight;
	
	//レンダラーの作成
	const renderer = new THREE.WebGLRenderer({
    	canvas: document.querySelector('#mapCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(Width, Height);
	renderer.setClearColor(0xffffff);
	renderer.autoClear = false;
	
	//地図シーンの作成
	const GroundMapScene = new THREE.Scene();
	const UndergroundMapScene = new THREE.Scene();
	const SecondFloorScene = new THREE.Scene();
	const ThirdFloorScene = new THREE.Scene();
	const FourthFloorScene = new THREE.Scene();

	//カメラの作成
	const camera = new THREE.PerspectiveCamera(30, Width / Height)
	
	//カメラの初期位置設定
	camera.position.set(0, 10, 0);
	
	//カメラ操作
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.maxPolarAngle = Math.PI*2/5;//回転制限
	controls.minDistance = 1;//ズームイン制限
	controls.maxDistance = 12;//ズームアウト制限
	
	//ライトの設定
	const ambientLightG = new THREE.AmbientLight(0xffffff, 0.5);
	const directionalLightG = new THREE.DirectionalLight(0xffffff, 1);
	const ambientLightB = new THREE.AmbientLight(0xffffff, 0.5);
	const directionalLightB = new THREE.DirectionalLight(0xffffff, 1);
	const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.5);
	const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
	const ambientLight3 = new THREE.AmbientLight(0xffffff, 0.5);
	const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
	const ambientLight4 = new THREE.AmbientLight(0xffffff, 0.5);
	const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
	directionalLightG.position.set(-0.2, 1, 1);
	directionalLightB.position.set(-0.2, 1, 1);
	directionalLight2.position.set(-0.2, 1, 1);
	directionalLight3.position.set(-0.2, 1, 1);
	directionalLight4.position.set(-0.2, 1, 1);
	GroundMapScene.add(ambientLightG);
	GroundMapScene.add(directionalLightG);
	UndergroundMapScene.add(ambientLightB);
	UndergroundMapScene.add(directionalLightB);
	SecondFloorScene.add(ambientLight2);
	SecondFloorScene.add(directionalLight2);
	ThirdFloorScene.add(ambientLight3);
	ThirdFloorScene.add(directionalLight3);
	FourthFloorScene.add(ambientLight4);
	FourthFloorScene.add(directionalLight4);
	
	//ファイル読み込み
	//地上マップ
	new THREE.MTLLoader().setPath('model/').load('map.mtl', function(materials){
		
		materials.preload();
		
		new THREE.OBJLoader().setPath('model/').setMaterials(materials).load('map.obj', function(object){
			
			const objmodel = object.clone();
			GroundMap = new THREE.Object3D();
			GroundMap.add(objmodel);
			GroundMap.position.set(0,0,0);
			GroundMapScene.add(GroundMap);
		});
	});
	
	let GroundMap = new THREE.Mesh();
	
	//地下マップ
	new THREE.MTLLoader().setPath('model/').load('underground.mtl', function(materials){
		
		materials.preload();
		
		new THREE.OBJLoader().setPath('model/').setMaterials(materials).load('underground.obj', function(object){
			
			const objmodel = object.clone();
			UndergroundMap = new THREE.Object3D();
			UndergroundMap.add(objmodel);
			UndergroundMap.position.set(0,0,0);
			UndergroundMapScene.add(UndergroundMap);
		});
	});
	
	let UndergroundMap = new THREE.Mesh();
	
	//2階マップ
	new THREE.MTLLoader().setPath('model/').load('secondfloor.mtl', function(materials){
		
		materials.preload();
		
		new THREE.OBJLoader().setPath('model/').setMaterials(materials).load('secondfloor.obj', function(object){
			
			const objmodel = object.clone();
			SecondFloorMap = new THREE.Object3D();
			SecondFloorMap.add(objmodel);
			SecondFloorMap.position.set(0,0,0);
			SecondFloorScene.add(SecondFloorMap);
		});
	});
	
	let SecondFloorMap = new THREE.Mesh();
	
	//3階マップ
	new THREE.MTLLoader().setPath('model/').load('thirdfloor.mtl', function(materials){
		
		materials.preload();
		
		new THREE.OBJLoader().setPath('model/').setMaterials(materials).load('thirdfloor.obj', function(object){
			
			const objmodel = object.clone();
			ThirdFloorMap = new THREE.Object3D();
			ThirdFloorMap.add(objmodel);
			ThirdFloorMap.position.set(0,0,0);
			ThirdFloorScene.add(ThirdFloorMap);
		});
	});
	
	let ThirdFloorMap = new THREE.Mesh();
	
	//4階マップ
	new THREE.MTLLoader().setPath('model/').load('fourthfloor.mtl', function(materials){
		
		materials.preload();
		
		new THREE.OBJLoader().setPath('model/').setMaterials(materials).load('fourthfloor.obj', function(object){
			
			const objmodel = object.clone();
			FourthFloorMap = new THREE.Object3D();
			FourthFloorMap.add(objmodel);
			FourthFloorMap.position.set(0,0,0);
			FourthFloorScene.add(FourthFloorMap);
		});
	});
	
	let FourthFloorMap = new THREE.Mesh();
	
	const pictSize = 0.13;
	
	//階段のスプライト
	const pict_stairs = new THREE.SpriteMaterial({
		map: new THREE.TextureLoader().load('imgs/stairs.png'),
	});
	
	//駅のスプライト
	const pict_station = new THREE.SpriteMaterial({
		map: new THREE.TextureLoader().load('imgs/station.png'),
	});
	
	//バス停のスプライト
	const pict_bus = new THREE.SpriteMaterial({
		map: new THREE.TextureLoader().load('imgs/busstop.png'),
	});
	
	const Pict = [
		['exit', 0.24, 0, -1.68],		//0.東1
		['exit', 0, 0, -1.68],			//1.西1
		['exit', 0.24, 0, -1.43],		//2.東2
		['exit', 0, 0, -1.43],			//3.西2a
		['exit', 0.24, 0, -0.95],		//4.東3a
		['exit', 0.24, 0, -0.6],		//5.東4
		['exit', 0.24, 0, -0.25],		//6.東5
		['exit', 0, 0, -0.25],			//7.西5
		['exit', 0, 0, 0.28],			//8.西6
		['exit', 0.02, 0, 0.48],		//9.西7
		['exit', 0.12, 0, 0.83],		//10.西8
		['exit', 0.41, 0, 0.97],		//11.東10
		['exit', 0.16, 0, 0.97],		//12.西10
		['exit', 0.35, 0, 1.7],			//13.西12a
		['exit', 0.41, 0, 1.94],		//14.西12b
		['exit', 0.77, 0, 2.3],			//15.東12c
		['exit', 0.5, 0, 2.27],			//16.西12c
		['exit', -1.35, 0, -0.81],		//17.天神駅2番出口
		['exit', -0.6, 0, -0.96],		//18.天神駅4番出口
		['exit', -0.6, 0, -0.74],		//19.天神駅5番出口
		['exit', 1.15, 0, -0.73],		//20.天神駅15番出口
		['exit', 1.08, 0, 1.6],			//21.天神南駅3番出口
		['exit', 1.99, 0, 1.72],		//22.天神南駅6番出口
		['stairs', -0.16, 0.03, -0.04],	//23.天神大画面前
		['stairs', -0.07, 0.07, 0.3],	//24.福岡駅改札横
		['stairs', 0.01, 0.05, 0.68],	//25.バスターミナル乗車口
		['stairs', -0.2, 0.05, 0.63],	//26.バスターミナル降車口
		['station', -0.16, 0.05, 0.3],	//27.福岡駅北口
		['station', 0.04, 0, 1.02],		//28.福岡駅三越口
		['station', 0.19, 0, 1.73],		//29.福岡駅南口
		['station', 0.12, -0.1, -0.88],	//30.天神駅
		['station', 1.09, -0.1, 1.72],	//31.天神南駅
		['bus', -0.1, 0.1, 0.65],		//32.バスターミナル
		['bus', 0.07, 0, 0.65],			//33.1AB
		['bus', 0.2, 0, 1.14],			//34.1C
		['bus', 0, 0, -0.07],			//35.2AB
		['bus', 0, 0, -2.02],			//36.3
		['bus', 0.49, 0, 1.25],			//37.4ABC
		['bus', 0.24, 0, -0.43],		//38.7ABC
		['bus', 0.24, 0, -2.16],		//39.9ABC
		['bus', -1.24, 0, -0.81],		//40.10
		['bus', -0.55, 0, -0.83],		//41.11
		['bus', 1.15, 0.01, -0.83],		//42.12
		['bus', -0.47, 0, -0.95],		//43.13A
		['bus', 0.65, 0, -0.95],		//44.14
		['bus', -1.18, 0, -1.43],		//45.15
		['bus', 1.15, 0, -1.43],		//46.16
		['bus', -0.5, 0, -1.68],		//47.17
		['bus', 0.67, 0, -1.68],		//48.18ABC
		['bus', 1, 0, -1.68],			//49.19AB
		['bus', -0.3, 0, 1.8],			//50.警固神社前（東行）
		['bus', -0.45, 0, 2.06],		//51.警固神社前（西行）
		['bus', 1.36, 0, 1.56],			//52.天神一丁目（東行）
		['bus', 2.1, 0, 1.71],			//53.天神一丁目（西行）
		['bus', 0.53, 0, 2.37],			//54.天神南（北行）
		['bus', 0.81, 0, 2.4]			//55.天神南（南行）
	]
	
	var P = new Array(Pict.length);
	var PictScene = new Array(Pict.length);
	for(let i=0; i<Pict.length; i++){
		if(Pict[i][0] == 'stairs'){
			P[i] = new THREE.Sprite(pict_stairs);
		}
		else if(Pict[i][0] == 'station'){
			P[i] = new THREE.Sprite(pict_station);
		}
		else if(Pict[i][0] == 'bus'){
			P[i] = new THREE.Sprite(pict_bus);
		}
		
		PictScene[i] = new THREE.Scene();
		if(i>22){
			P[i].position.set(Pict[i][1], Pict[i][2], Pict[i][3]);
			P[i].scale.set(pictSize, pictSize, pictSize);
			PictScene[i].add(P[i]);
		}
	}
	
	//ラベル
	var labelTexture = new Array(58);
	var label = new Array(58);
	const labelHeight = 0.1;
	const labelSceneE1a = new THREE.Scene();
	const labelSceneE1b = new THREE.Scene();
	
	for(i=0; i<58; i++){
		if(i!=0 && i!=23 && i!=24 && i!=25 && i!=26){
			labelTexture[i] = new THREE.SpriteMaterial({
				map: new THREE.TextureLoader().load('imgs/labeltext'+i+'.png')
			});
			label[i] = new THREE.Sprite(labelTexture[i]);
			if(i<23){
				label[i].position.set(Pict[i][1], Pict[i][2], Pict[i][3]);
			}
			else if(i==41){
				label[i].position.set(Pict[i][1]+0.1, Pict[i][2]+0.05, Pict[i][3]);
			}
			else if(i==31 || i==32 || i==54 || i==55){
				label[i].position.set(Pict[i][1], Pict[i][2]+0.05, Pict[i][3]+0.1);
			}
			else if(i==56 || i==57){
				label[i].position.set(Pict[0][1], Pict[0][2], Pict[0][3]);
			}
			else{
				label[i].position.set(Pict[i][1], Pict[i][2]+0.05, Pict[i][3]-0.1);
			}
			
			if(i==27 || i==28 || i==29 || i==32 || i==37 || i==38 || i==39 || i==48 || i==49 || i==50 || i==51 || i==52 || i==53){
				label[i].scale.set(labelHeight*4, labelHeight, labelHeight);
			}
			else if(i==30 || i==31 || i==33 || i==35 || i==54 || i==55){
				label[i].scale.set(labelHeight*2, labelHeight, labelHeight);
			}
			else{
				label[i].scale.set(labelHeight, labelHeight, labelHeight);
			}
			
			if(i==56){
				labelSceneE1a.add(label[i]);
			}
			else if(i==57){
				labelSceneE1b.add(label[i]);
			}
			else{
				PictScene[i].add(label[i]);
			}
		}
	}
	
	//ルート
	const lineMaterial = new THREE.LineBasicMaterial({color:0x1fbdff, linewidth:20});
	var routeGeometry = new Array(122);
	var route = new Array(122);
	var scene_route = new Array(122);
	
	for(let i=0; i<122; i++){routeGeometry[i] = new THREE.Geometry();}
	
	routeGeometry[0].vertices.push(
		new THREE.Vector3(0, 0, -1.68),
		new THREE.Vector3(0.12, -0.1, -1.54),
		new THREE.Vector3(0.12, -0.1, -1.43));
	routeGeometry[1].vertices.push(
		new THREE.Vector3(0.25, 0, -1.68),
		new THREE.Vector3(0.12, -0.1, -1.54),
		new THREE.Vector3(0.12, -0.1, -1.43));
	routeGeometry[2].vertices.push(
		new THREE.Vector3(0.12, -0.1, -1.43),
		new THREE.Vector3(0.12, -0.1, -0.88));
	routeGeometry[3].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.88),
		new THREE.Vector3(0.12, -0.1, -0.6));
	routeGeometry[4].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.6),
		new THREE.Vector3(0.12, -0.1, -0.25));
	routeGeometry[5].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.25),
		new THREE.Vector3(0.12, -0.1, 0.28));
	routeGeometry[6].vertices.push(
		new THREE.Vector3(0.12, -0.1, 0.28),
		new THREE.Vector3(0.12, -0.1, 0.42),
		new THREE.Vector3(0.14, -0.1, 0.48));
	routeGeometry[7].vertices.push(
		new THREE.Vector3(0.14, -0.1, 0.48),
		new THREE.Vector3(0.24, -0.1, 0.83));
	routeGeometry[8].vertices.push(
		new THREE.Vector3(0.24, -0.1, 0.83),
		new THREE.Vector3(0.29, -0.1, 0.99));
	routeGeometry[9].vertices.push(
		new THREE.Vector3(0.29, -0.1, 0.99),
		new THREE.Vector3(0.52, -0.1, 1.81));
	routeGeometry[10].vertices.push(
		new THREE.Vector3(0.52, -0.1, 1.81),
		new THREE.Vector3(1.09, -0.1, 1.72));
	routeGeometry[11].vertices.push(
		new THREE.Vector3(1.09, -0.1, 1.72),
		new THREE.Vector3(1.97, -0.1, 1.6),
		new THREE.Vector3(1.99, 0, 1.72),
		new THREE.Vector3(2.1, 0, 1.71));
	routeGeometry[12].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.88),
		new THREE.Vector3(1.15, -0.1, -0.88),
		new THREE.Vector3(1.15, 0, -0.81));
	routeGeometry[13].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.88),
		new THREE.Vector3(-0.6, -0.1, -0.88),
		new THREE.Vector3(-0.6, 0, -0.81),
		new THREE.Vector3(-0.55, 0, -0.81));
	routeGeometry[14].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.88),
		new THREE.Vector3(-0.6, -0.1, -0.88),
		new THREE.Vector3(-0.6, 0, -0.95),
		new THREE.Vector3(-0.47, 0, -0.95));
	routeGeometry[15].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.88),
		new THREE.Vector3(-1.35, -0.1, -0.88),
		new THREE.Vector3(-1.35, 0, -0.81),
		new THREE.Vector3(-1.24, 0, -0.81));
	routeGeometry[16].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.88),
		new THREE.Vector3(0.24, 0, -0.95));
	routeGeometry[17].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.6),
		new THREE.Vector3(0.24, 0, -0.6));
	routeGeometry[18].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.25),
		new THREE.Vector3(0.24, 0, -0.25));
	routeGeometry[19].vertices.push(
		new THREE.Vector3(0.12, -0.1, -0.25),
		new THREE.Vector3(0, 0, -0.25));
	routeGeometry[20].vertices.push(
		new THREE.Vector3(0.12, -0.1, 0.28),
		new THREE.Vector3(0, 0, 0.28));
	routeGeometry[21].vertices.push(
		new THREE.Vector3(0.14, -0.1, 0.48),
		new THREE.Vector3(0.02, 0, 0.48));
	routeGeometry[22].vertices.push(
		new THREE.Vector3(0.24, -0.1, 0.83),
		new THREE.Vector3(0.12, 0, 0.83));
	routeGeometry[23].vertices.push(
		new THREE.Vector3(0.29, -0.1, 0.99),
		new THREE.Vector3(0.41, 0, 0.97));
	routeGeometry[24].vertices.push(
		new THREE.Vector3(0.29, -0.1, 0.99),
		new THREE.Vector3(0.15, 0, 0.97));
	routeGeometry[25].vertices.push(
		new THREE.Vector3(0.52, -0.1, 1.81),
		new THREE.Vector3(0.35, 0, 1.7));
	routeGeometry[26].vertices.push(
		new THREE.Vector3(0.52, -0.1, 1.81),
		new THREE.Vector3(0.41, 0, 1.94));
	routeGeometry[27].vertices.push(
		new THREE.Vector3(0.52, -0.1, 1.81),
		new THREE.Vector3(0.59, -0.1, 2.1),
		new THREE.Vector3(0.5, 0, 2.27),
		new THREE.Vector3(0.53, 0, 2.37));
	routeGeometry[28].vertices.push(
		new THREE.Vector3(0.52, -0.1, 1.81),
		new THREE.Vector3(0.59, -0.1, 2.1),
		new THREE.Vector3(0.77, 0, 2.3),
		new THREE.Vector3(0.81, 0, 2.4));
	routeGeometry[29].vertices.push(
		new THREE.Vector3(1.09, -0.1, 1.72),
		new THREE.Vector3(1.08, 0, 1.6));
	routeGeometry[30].vertices.push(
		new THREE.Vector3(0.12, -0.1, -1.43),
		new THREE.Vector3(0.25, 0, -1.43));
	routeGeometry[31].vertices.push(
		new THREE.Vector3(0.12, -0.1, -1.43),
		new THREE.Vector3(0, 0, -1.43));
	routeGeometry[32].vertices.push(
		new THREE.Vector3(0.24, 0, -2.16),
		new THREE.Vector3(0.24, 0, -1.68));
	routeGeometry[33].vertices.push(
		new THREE.Vector3(0, 0, -2.02),
		new THREE.Vector3(0, 0, -1.68));
	routeGeometry[34].vertices.push(
		new THREE.Vector3(0.24, 0, -1.68),
		new THREE.Vector3(0, 0, -1.68));
	routeGeometry[35].vertices.push(
		new THREE.Vector3(0.24, 0, -1.68),
		new THREE.Vector3(0.24, 0, -1.43));
	routeGeometry[36].vertices.push(
		new THREE.Vector3(0, 0, -1.68),
		new THREE.Vector3(0, 0, -1.43));
	routeGeometry[37].vertices.push(
		new THREE.Vector3(0.24, 0, -1.43),
		new THREE.Vector3(0, 0, -1.43));
	routeGeometry[38].vertices.push(
		new THREE.Vector3(0.24, 0, -1.43),
		new THREE.Vector3(0.24, 0, -0.95));
	routeGeometry[39].vertices.push(
		new THREE.Vector3(0, 0, -1.43),
		new THREE.Vector3(0, 0, -0.95));
	routeGeometry[40].vertices.push(
		new THREE.Vector3(0.24, 0, -0.95),
		new THREE.Vector3(0, 0, -0.95));
	routeGeometry[41].vertices.push(
		new THREE.Vector3(0.24, 0, -0.95),
		new THREE.Vector3(0.24, 0, -0.81));
	routeGeometry[42].vertices.push(
		new THREE.Vector3(0, 0, -0.95),
		new THREE.Vector3(0, 0, -0.81));
	routeGeometry[43].vertices.push(
		new THREE.Vector3(0.24, 0, -0.81),
		new THREE.Vector3(0, 0, -0.81));
	routeGeometry[44].vertices.push(
		new THREE.Vector3(0.24, 0, -0.81),
		new THREE.Vector3(0.24, 0, -0.6));
	routeGeometry[45].vertices.push(
		new THREE.Vector3(0.24, 0, -0.6),
		new THREE.Vector3(0.24, 0, -0.43));
	routeGeometry[46].vertices.push(
		new THREE.Vector3(0, 0, -0.81),
		new THREE.Vector3(0, 0, -0.43));
	routeGeometry[47].vertices.push(
		new THREE.Vector3(0.24, 0, -0.43),
		new THREE.Vector3(0, 0, -0.43));
	routeGeometry[48].vertices.push(
		new THREE.Vector3(0.24, 0, -0.43),
		new THREE.Vector3(0.24, 0, -0.25));
	routeGeometry[49].vertices.push(
		new THREE.Vector3(0, 0, -0.43),
		new THREE.Vector3(0, 0, -0.25));
	routeGeometry[50].vertices.push(
		new THREE.Vector3(0.24, 0, -0.25),
		new THREE.Vector3(0.24, 0, 0.38),
		new THREE.Vector3(0.41, 0, 0.97));
	routeGeometry[51].vertices.push(
		new THREE.Vector3(0, 0, -0.25),
		new THREE.Vector3(0, 0, -0.07));
	routeGeometry[52].vertices.push(
		new THREE.Vector3(0, 0, -0.07),
		new THREE.Vector3(0, 0, 0.28));
	routeGeometry[53].vertices.push(
		new THREE.Vector3(0, 0, 0.28),
		new THREE.Vector3(0, 0, 0.4),
		new THREE.Vector3(0.02, 0, 0.48));
	routeGeometry[54].vertices.push(
		new THREE.Vector3(0.02, 0, 0.48),
		new THREE.Vector3(0.07, 0, 0.65));
	routeGeometry[55].vertices.push(
		new THREE.Vector3(0.07, 0, 0.65),
		new THREE.Vector3(0.12, 0, 0.83));
	routeGeometry[56].vertices.push(
		new THREE.Vector3(0.12, 0, 0.83),
		new THREE.Vector3(0.15, 0, 0.97));
	routeGeometry[57].vertices.push(
		new THREE.Vector3(0.41, 0, 0.97),
		new THREE.Vector3(0.15, 0, 0.97));
	routeGeometry[58].vertices.push(
		new THREE.Vector3(0.41, 0, 0.97),
		new THREE.Vector3(0.49, 0, 1.25));
	routeGeometry[59].vertices.push(
		new THREE.Vector3(0.16, 0, 1.01),
		new THREE.Vector3(0.2, 0, 1.14));
	routeGeometry[60].vertices.push(
		new THREE.Vector3(0.49, 0, 1.25),
		new THREE.Vector3(0.6, 0, 1.67));
	routeGeometry[61].vertices.push(
		new THREE.Vector3(0.2, 0, 1.14),
		new THREE.Vector3(0.35, 0, 1.7));
	routeGeometry[62].vertices.push(
		new THREE.Vector3(0.6, 0, 1.67),
		new THREE.Vector3(0.35, 0, 1.7));
	routeGeometry[63].vertices.push(
		new THREE.Vector3(0.6, 0, 1.67),
		new THREE.Vector3(0.67, 0, 1.9));
	routeGeometry[64].vertices.push(
		new THREE.Vector3(0.35, 0, 1.7),
		new THREE.Vector3(0.41, 0, 1.94));
	routeGeometry[65].vertices.push(
		new THREE.Vector3(0.67, 0, 1.9),
		new THREE.Vector3(0.41, 0, 1.94));
	routeGeometry[66].vertices.push(
		new THREE.Vector3(0.67, 0, 1.9),
		new THREE.Vector3(0.81, 0, 2.4));
	routeGeometry[67].vertices.push(
		new THREE.Vector3(0.41, 0, 1.94),
		new THREE.Vector3(0.53, 0, 2.37));
	routeGeometry[68].vertices.push(
		new THREE.Vector3(1, 0, -1.68),
		new THREE.Vector3(0.8, 0, -1.68));
	routeGeometry[69].vertices.push(
		new THREE.Vector3(0.8, 0, -1.68),
		new THREE.Vector3(0.67, 0, -1.68));
	routeGeometry[70].vertices.push(
		new THREE.Vector3(0.67, 0, -1.68),
		new THREE.Vector3(0.24, 0, -1.68));
	routeGeometry[71].vertices.push(
		new THREE.Vector3(0.8, 0, -1.68),
		new THREE.Vector3(0.8, 0, -1.43));
	routeGeometry[72].vertices.push(
		new THREE.Vector3(1.15, 0, -1.43),
		new THREE.Vector3(0.8, 0, -1.43));
	routeGeometry[73].vertices.push(
		new THREE.Vector3(0.8, 0, -1.43),
		new THREE.Vector3(0.24, 0, -1.43));
	routeGeometry[74].vertices.push(
		new THREE.Vector3(0, 0, -1.68),
		new THREE.Vector3(-0.5, 0, -1.68));
	routeGeometry[75].vertices.push(
		new THREE.Vector3(-0.5, 0, -1.68),
		new THREE.Vector3(-0.72, 0, -1.68),
		new THREE.Vector3(-0.72, 0, -1.43));
	routeGeometry[76].vertices.push(
		new THREE.Vector3(0, 0, -1.43),
		new THREE.Vector3(-0.72, 0, -1.43));
	routeGeometry[77].vertices.push(
		new THREE.Vector3(-0.72, 0, -1.43),
		new THREE.Vector3(-1.18, 0, -1.43));
	routeGeometry[78].vertices.push(
		new THREE.Vector3(0.8, 0, -1.43),
		new THREE.Vector3(0.8, 0, -0.95));
	routeGeometry[79].vertices.push(
		new THREE.Vector3(-0.72, 0, -1.43),
		new THREE.Vector3(-0.72, 0, -0.95));
	routeGeometry[80].vertices.push(
		new THREE.Vector3(1.6, 0, -0.81),
		new THREE.Vector3(1.6, 0, -0.95),
		new THREE.Vector3(0.8, 0, -0.95));
	routeGeometry[81].vertices.push(
		new THREE.Vector3(0.8, 0, -0.95),
		new THREE.Vector3(0.65, 0, -0.95));
	routeGeometry[82].vertices.push(
		new THREE.Vector3(0.65, 0, -0.95),
		new THREE.Vector3(0.24, 0, -0.95));
	routeGeometry[83].vertices.push(
		new THREE.Vector3(0, 0, -0.95),
		new THREE.Vector3(-0.47, 0, -0.95));
	routeGeometry[84].vertices.push(
		new THREE.Vector3(-0.47, 0, -0.95),
		new THREE.Vector3(-0.72, 0, -0.95));
	routeGeometry[85].vertices.push(
		new THREE.Vector3(0.8, 0, -0.95),
		new THREE.Vector3(0.8, 0, -0.81));
	routeGeometry[86].vertices.push(
		new THREE.Vector3(-0.72, 0, -0.95),
		new THREE.Vector3(-0.72, 0, -0.81));
	routeGeometry[87].vertices.push(
		new THREE.Vector3(1.6, 0, -0.81),
		new THREE.Vector3(1.15, 0, -0.81));
	routeGeometry[88].vertices.push(
		new THREE.Vector3(1.15, 0, -0.81),
		new THREE.Vector3(0.8, 0, -0.81));
	routeGeometry[89].vertices.push(
		new THREE.Vector3(0.8, 0, -0.81),
		new THREE.Vector3(0.24, 0, -0.81));
	routeGeometry[90].vertices.push(
		new THREE.Vector3(0, 0, -0.81),
		new THREE.Vector3(-0.37, 0, -0.81));
	routeGeometry[91].vertices.push(
		new THREE.Vector3(-0.37, 0, -0.81),
		new THREE.Vector3(-0.55, 0, -0.81));
	routeGeometry[92].vertices.push(
		new THREE.Vector3(-0.72, 0, -0.81),
		new THREE.Vector3(-1.24, 0, -0.81));
	routeGeometry[93].vertices.push(
		new THREE.Vector3(1.6, 0, -0.81),
		new THREE.Vector3(1.6, 0, 1.52));
	routeGeometry[94].vertices.push(
		new THREE.Vector3(-0.37, 0, -0.81),
		new THREE.Vector3(-0.37, 0, -0.07));
	routeGeometry[95].vertices.push(
		new THREE.Vector3(0, 0, -0.07),
		new THREE.Vector3(-0.16, 0, -0.07),
		new THREE.Vector3(-0.16, 0.05, -0.02),
		new THREE.Vector3(-0.16, 0.05, 0.3));
	routeGeometry[96].vertices.push(
		new THREE.Vector3(-0.37, 0, -0.07),
		new THREE.Vector3(-0.16, 0, -0.07),
		new THREE.Vector3(-0.16, 0.05, -0.02),
		new THREE.Vector3(-0.16, 0.05, 0.3));
	routeGeometry[97].vertices.push(
		new THREE.Vector3(-0.37, 0, -0.07),
		new THREE.Vector3(-0.37, 0, 0.45),
		new THREE.Vector3(-0.25, 0, 0.45),
		new THREE.Vector3(-0.2, 0, 0.63));
	routeGeometry[98].vertices.push(
		new THREE.Vector3(0.02, 0, 0.48),
		new THREE.Vector3(-0.2, 0, 0.63));
	routeGeometry[99].vertices.push(
		new THREE.Vector3(0.07, 0, 0.65),
		new THREE.Vector3(-0.2, 0, 0.63));
	routeGeometry[100].vertices.push(
		new THREE.Vector3(-0.2, 0, 0.63),
		new THREE.Vector3(-0.09, 0, 1.03));
	routeGeometry[101].vertices.push(
		new THREE.Vector3(0.16, 0, 1.01),
		new THREE.Vector3(0.04, 0, 1.02));
	routeGeometry[102].vertices.push(
		new THREE.Vector3(0.04, 0, 1.02),
		new THREE.Vector3(-0.09, 0, 1.03));
	routeGeometry[103].vertices.push(
		new THREE.Vector3(-0.09, 0, 1.03),
		new THREE.Vector3(-0.18, 0, 1.04),
		new THREE.Vector3(0.02, 0, 1.75));
	routeGeometry[104].vertices.push(
		new THREE.Vector3(1.6, 0, 1.52),
		new THREE.Vector3(1.36, 0, 1.56));
	routeGeometry[105].vertices.push(
		new THREE.Vector3(1.36, 0, 1.56),
		new THREE.Vector3(1.08, 0, 1.6));
	routeGeometry[106].vertices.push(
		new THREE.Vector3(1.08, 0, 1.6),
		new THREE.Vector3(0.6, 0, 1.67));
	routeGeometry[107].vertices.push(
		new THREE.Vector3(0.35, 0, 1.7),
		new THREE.Vector3(0.19, 0, 1.73));
	routeGeometry[108].vertices.push(
		new THREE.Vector3(0.19, 0, 1.73),
		new THREE.Vector3(0.02, 0, 1.75));
	routeGeometry[109].vertices.push(
		new THREE.Vector3(0.02, 0, 1.75),
		new THREE.Vector3(-0.1, 0, 1.77));
	routeGeometry[110].vertices.push(
		new THREE.Vector3(-0.1, 0, 1.77),
		new THREE.Vector3(-0.3, 0, 1.8));
	routeGeometry[111].vertices.push(
		new THREE.Vector3(1.6, 0, 1.52),
		new THREE.Vector3(1.6, 0, 1.77));
	routeGeometry[112].vertices.push(
		new THREE.Vector3(-0.1, 0, 1.77),
		new THREE.Vector3(-0.06, 0, 2.01));
	routeGeometry[113].vertices.push(
		new THREE.Vector3(2.1, 0, 1.71),
		new THREE.Vector3(1.6, 0, 1.77));
	routeGeometry[114].vertices.push(
		new THREE.Vector3(1.6, 0, 1.77),
		new THREE.Vector3(0.67, 0, 1.9));
	routeGeometry[115].vertices.push(
		new THREE.Vector3(0.41, 0, 1.94),
		new THREE.Vector3(-0.06, 0, 2.01));
	routeGeometry[116].vertices.push(
		new THREE.Vector3(-0.06, 0, 2.01),
		new THREE.Vector3(-0.45, 0, 2.06));
	routeGeometry[117].vertices.push(
		new THREE.Vector3(-0.16, 0.05, 0.3),
		new THREE.Vector3(-0.07, 0.05, 0.3),
		new THREE.Vector3(-0.07, 0.08, 0.3),
		new THREE.Vector3(-0.07, 0.08, 0.39),
		new THREE.Vector3(0.01, 0.08, 0.68));
	routeGeometry[118].vertices.push(
		new THREE.Vector3(-0.16, 0.05, 0.3),
		new THREE.Vector3(-0.26, 0.05, 0.3),
		new THREE.Vector3(-0.26, 0.05, 0.4),
		new THREE.Vector3(-0.22, 0.05, 0.65));
	routeGeometry[119].vertices.push(
		new THREE.Vector3(0.07, 0, 0.65),
		new THREE.Vector3(0.01, 0, 0.68));
	routeGeometry[120].vertices.push(
		new THREE.Vector3(0.15, 0, 0.97),
		new THREE.Vector3(0.16, 0, 1.01));
	routeGeometry[121].vertices.push(
		new THREE.Vector3(-0.55, 0, -0.81),
		new THREE.Vector3(-0.72, 0, -0.81));
	
	for(let i=0; i<122; i++){
		route[i] = new THREE.Line(routeGeometry[i], lineMaterial);
		scene_route[i] = new THREE.Scene();
		scene_route[i].add(route[i]);
	}
	
	var Departure, Destination;
	
	//フロア切り替え
	var ground = true;
	var underground = false;
	var secondfloor = true;
	var thirdfloor = true;
	var fourthfloor = true;
	
	document.getElementById('groundButton').onclick = function(){
		ground =true;
		underground = false;
		secondfloor = true;
		thirdfloor = true;
		fourthfloor = true;
		document.getElementById('groundButton').style.backgroundColor = '#3095CA';
		document.getElementById('groundButton').style.color = '#ffffff';
		document.getElementById('thirdButton').style.backgroundColor = '#ffffff';
		document.getElementById('thirdButton').style.color = '#2b2b2b';
		document.getElementById('secondButton').style.backgroundColor = '#ffffff';
		document.getElementById('secondButton').style.color = '#2b2b2b';
		document.getElementById('firstButton').style.backgroundColor = '#ffffff';
		document.getElementById('firstButton').style.color = '#2b2b2b';
		document.getElementById('undergroundButton').style.backgroundColor = '#ffffff';
		document.getElementById('undergroundButton').style.color = '#2b2b2b';
	}
	document.getElementById('undergroundButton').onclick = function(){
		ground =false;
		underground = true;
		secondfloor = false;
		thirdfloor = false;
		fourthfloor = false;
		document.getElementById('undergroundButton').style.backgroundColor = '#3095CA';
		document.getElementById('undergroundButton').style.color = '#ffffff';
		document.getElementById('thirdButton').style.backgroundColor = '#ffffff';
		document.getElementById('thirdButton').style.color = '#2b2b2b';
		document.getElementById('secondButton').style.backgroundColor = '#ffffff';
		document.getElementById('secondButton').style.color = '#2b2b2b';
		document.getElementById('firstButton').style.backgroundColor = '#ffffff';
		document.getElementById('firstButton').style.color = '#2b2b2b';
		document.getElementById('groundButton').style.backgroundColor = '#ffffff';
		document.getElementById('groundButton').style.color = '#2b2b2b';
	}
	document.getElementById('firstButton').onclick = function(){
		ground =true;
		underground = false;
		secondfloor = false;
		thirdfloor = false;
		fourthfloor = false;
		document.getElementById('firstButton').style.backgroundColor = '#3095CA';
		document.getElementById('firstButton').style.color = '#ffffff';
		document.getElementById('thirdButton').style.backgroundColor = '#ffffff';
		document.getElementById('thirdButton').style.color = '#2b2b2b';
		document.getElementById('secondButton').style.backgroundColor = '#ffffff';
		document.getElementById('secondButton').style.color = '#2b2b2b';
		document.getElementById('groundButton').style.backgroundColor = '#ffffff';
		document.getElementById('groundButton').style.color = '#2b2b2b';
		document.getElementById('undergroundButton').style.backgroundColor = '#ffffff';
		document.getElementById('undergroundButton').style.color = '#2b2b2b';
	}
	document.getElementById('secondButton').onclick = function(){
		ground =true;
		underground = false;
		secondfloor = true;
		thirdfloor = false;
		fourthfloor = false;
		document.getElementById('secondButton').style.backgroundColor = '#3095CA';
		document.getElementById('secondButton').style.color = '#ffffff';
		document.getElementById('thirdButton').style.backgroundColor = '#ffffff';
		document.getElementById('thirdButton').style.color = '#2b2b2b';
		document.getElementById('firstButton').style.backgroundColor = '#ffffff';
		document.getElementById('firstButton').style.color = '#2b2b2b';
		document.getElementById('groundButton').style.backgroundColor = '#ffffff';
		document.getElementById('groundButton').style.color = '#2b2b2b';
		document.getElementById('undergroundButton').style.backgroundColor = '#ffffff';
		document.getElementById('undergroundButton').style.color = '#2b2b2b';
	}
	document.getElementById('thirdButton').onclick = function(){
		ground =true;
		underground = false;
		secondfloor = true;
		thirdfloor = true;
		fourthfloor = false;
		document.getElementById('thirdButton').style.backgroundColor = '#3095CA';
		document.getElementById('thirdButton').style.color = '#ffffff';
		document.getElementById('secondButton').style.backgroundColor = '#ffffff';
		document.getElementById('secondButton').style.color = '#2b2b2b';
		document.getElementById('firstButton').style.backgroundColor = '#ffffff';
		document.getElementById('firstButton').style.color = '#2b2b2b';
		document.getElementById('groundButton').style.backgroundColor = '#ffffff';
		document.getElementById('groundButton').style.color = '#2b2b2b';
		document.getElementById('undergroundButton').style.backgroundColor = '#ffffff';
		document.getElementById('undergroundButton').style.color = '#2b2b2b';
	}
	
	//実行
	animate();
	function animate(){
		Departure = document.getElementById('departure').value;
		Destination = document.getElementById('destination').value;
		controls.update();
		requestAnimationFrame(animate);
		renderer.clear();
		if(ground == true){renderer.render(GroundMapScene, camera);}
		if(underground == true){renderer.render(UndergroundMapScene, camera);}
		if(secondfloor == true){renderer.render(SecondFloorScene, camera);}
		if(thirdfloor == true){renderer.render(ThirdFloorScene, camera);}
		if(fourthfloor == true){renderer.render(FourthFloorScene, camera);}
		renderer.clearDepth();
		if(Departure == 'init' || Destination == 'init'){
			renderer.render(PictScene[27], camera);
			renderer.render(PictScene[28], camera);
			renderer.render(PictScene[29], camera);
			renderer.render(PictScene[30], camera);
			renderer.render(PictScene[31], camera);
			renderer.render(PictScene[32], camera);
			renderer.render(PictScene[33], camera);
			renderer.render(PictScene[34], camera);
			renderer.render(PictScene[35], camera);
			renderer.render(PictScene[36], camera);
			renderer.render(PictScene[37], camera);
			renderer.render(PictScene[38], camera);
			renderer.render(PictScene[39], camera);
			renderer.render(PictScene[40], camera);
			renderer.render(PictScene[41], camera);
			renderer.render(PictScene[42], camera);
			renderer.render(PictScene[43], camera);
			renderer.render(PictScene[44], camera);
			renderer.render(PictScene[45], camera);
			renderer.render(PictScene[46], camera);
			renderer.render(PictScene[47], camera);
			renderer.render(PictScene[48], camera);
			renderer.render(PictScene[49], camera);
			renderer.render(PictScene[50], camera);
			renderer.render(PictScene[51], camera);
			renderer.render(PictScene[52], camera);
			renderer.render(PictScene[53], camera);
			renderer.render(PictScene[54], camera);
			renderer.render(PictScene[55], camera);
		}
		
		else{
			if(Departure == 'bus_BT'){
				if(Destination == 'FukuokaStation'){
					renderer.render(scene_route[118], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'TenjinStation'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[21], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
					renderer.render(PictScene[9], camera);
				}
				else if(Destination == 'TenjinSouthStation'){
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[22], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[99], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
					renderer.render(PictScene[10], camera);
				}
				else if(Destination == 'bus_1AB'){
					renderer.render(scene_route[99], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_1C'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[99], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_2AB'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_3'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_4ABC'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[99], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_7ABC'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_9ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_10'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_11'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_12'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_13A'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_16'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[98], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_kego_E'){
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_kego_W'){
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[112], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_T1_E'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[99], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_T1_W'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[99], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_TS_N'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[99], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				else if(Destination == 'bus_TS_S'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[99], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[26], camera);
				}
				renderer.render(PictScene[32], camera);
			}
		
			if(Departure == 'FukuokaStation_N' || Destination == 'FukuokaStation'){
				if(Departure == 'TenjinStation' || Destination == 'TenjinStation'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[19], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
					renderer.render(PictScene[7], camera);
				}
				else if(Destination == 'TenjinSouthStation'){
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[20], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
					renderer.render(PictScene[8], camera);
				}
				else if(Destination == 'bus_BT'){
					renderer.render(scene_route[117], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[24], camera);
				}
				else if(Destination == 'bus_1AB'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Destination == 'bus_1C'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[95], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_2AB' || Destination == 'bus_2AB'){
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_3' || Destination == 'bus_3'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Destination == 'bus_4ABC'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_7ABC' || Destination == 'bus_7ABC'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_9ABC' || Destination == 'bus_9ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_10' || Destination == 'bus_10'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[96], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_11' || Destination == 'bus_11'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[96], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[95], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Destination == 'bus_kego_E'){
					renderer.render(scene_route[96], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Destination == 'bus_kego_W'){
					renderer.render(scene_route[96], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[112], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Destination == 'bus_T1_E'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[95], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Destination == 'bus_T1_W'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[95], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Destination == 'bus_TS_N'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[95], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				else if(Destination == 'bus_TS_S'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[95], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[27], camera);
					renderer.render(PictScene[23], camera);
				}
				if(Departure == 'FukuokaStation_N' && Destination == 'FukuokaStation'){
					renderer.render(PictScene[27], camera);
				}
			}
		
			if(Departure == 'FukuokaStation_M' || Destination == 'FukuokaStation'){
				if(Destination == 'TenjinStation'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[24], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
					renderer.render(PictScene[12], camera);
				}
				else if(Destination == 'TenjinSouthStation'){
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[24], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
					renderer.render(PictScene[12], camera);
				}
				else if(Destination == 'bus_BT'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[119], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_1AB' || Destination == 'bus_1AB'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Departure == 'bus_1C' || Destination == 'bus_1C'){
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[101], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_2AB'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_3'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Departure == 'bus_4ABC' || Destination == 'bus_4ABC'){
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_7ABC'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_9ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_10'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[102], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_11'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[102], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_12'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_13A'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_16'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_kego_E'){
					renderer.render(scene_route[102], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_kego_W'){
					renderer.render(scene_route[102], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[112], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_T1_E'){
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_T1_W'){
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[101], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_TS_N'){
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[101], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				else if(Destination == 'bus_TS_S'){
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[101], camera);
					renderer.clearDepth();
					renderer.render(PictScene[28], camera);
				}
				if(Departure == 'FukuokaStation_M' && Destination == 'FukuokaStation'){
					renderer.render(PictScene[28], camera);
				}
			}
		
			if(Departure == 'FukuokaStation_S' || Destination == 'FukuokaStation'){
				if(Destination == 'TenjinStation'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[25], camera);
					renderer.render(scene_route[107], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
					renderer.render(PictScene[13], camera);
				}
				else if(Departure == 'TenjinSouthStation' || Destination == 'TenjinSouthStation'){
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[25], camera);
					renderer.render(scene_route[107], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
					renderer.render(PictScene[13], camera);
				}
				else if(Destination == 'bus_BT'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[119], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Destination == 'bus_1AB'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_1C'){
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_2AB'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_3'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_4ABC'){
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[107], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_7ABC'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_9ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_10'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_11'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[108], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_12'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_13A'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_16'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[112], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[107], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[107], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[107], camera);
					renderer.clearDepth();
					renderer.render(PictScene[29], camera);
				}
				if(Departure == 'FukuokaStation_S' && Destination == 'FukuokaStation'){
					renderer.render(PictScene[29], camera);
				}
			}
		
			if(Departure == 'TenjinStation' || Destination == 'TenjinStation'){
				if(Departure == 'TenjinSouthStation' || Destination == 'TenjinSouthStation'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.clearDepth();
				}
				else if(Destination == 'bus_BT'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[21], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[9], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_1AB' || Destination == 'bus_1AB'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[21], camera);
					renderer.render(scene_route[54], camera);
					renderer.clearDepth();
					renderer.render(PictScene[9], camera);
				}
				else if(Departure == 'bus_1C' || Destination == 'bus_1C'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[24], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[12], camera);
				}
				else if(Departure == 'bus_2AB' || Destination == 'bus_2AB'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[19], camera);
					renderer.render(scene_route[51], camera);
					renderer.clearDepth();
					renderer.render(PictScene[7], camera);
				}
				else if(Departure == 'bus_3' || Destination == 'bus_3'){
					renderer.render(scene_route[0], camera);
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[33], camera);
					renderer.clearDepth();
					renderer.render(PictScene[1], camera);
				}
				else if(Departure == 'bus_4ABC' || Destination == 'bus_4ABC'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[23], camera);
					renderer.render(scene_route[58], camera);
					renderer.clearDepth();
					renderer.render(PictScene[11], camera);
				}
				else if(Departure == 'bus_7ABC' || Destination == 'bus_7ABC'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[17], camera);
					renderer.render(scene_route[45], camera);
					renderer.clearDepth();
					renderer.render(PictScene[5], camera);
				}
				else if(Departure == 'bus_9ABC' || Destination == 'bus_9ABC'){
					renderer.render(scene_route[1], camera);
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[32], camera);
					renderer.clearDepth();
					renderer.render(PictScene[0], camera);
					renderer.render(labelSceneE1a, camera);
				}
				else if(Departure == 'bus_10' || Destination == 'bus_10'){
					renderer.render(scene_route[15], camera);
					renderer.clearDepth();
					renderer.render(PictScene[17], camera);
				}
				else if(Departure == 'bus_11' || Destination == 'bus_11'){
					renderer.render(scene_route[13], camera);
					renderer.clearDepth();
					renderer.render(PictScene[19], camera);
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[12], camera);
					renderer.clearDepth();
					renderer.render(PictScene[20], camera);
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[14], camera);
					renderer.clearDepth();
					renderer.render(PictScene[18], camera);
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[16], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
					renderer.render(PictScene[4], camera);
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[31], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
					renderer.render(PictScene[3], camera);
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[30], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.clearDepth();
					renderer.render(PictScene[2], camera);
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[0], camera);
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
					renderer.render(PictScene[1], camera);
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[1], camera);
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
					renderer.render(PictScene[0], camera);
					renderer.render(labelSceneE1b, camera);
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[1], camera);
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
					renderer.render(PictScene[0], camera);
					renderer.render(labelSceneE1b, camera);
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[25], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
					renderer.render(PictScene[13], camera);
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[26], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
					renderer.render(PictScene[14], camera);
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[29], camera);
					renderer.render(scene_route[105], camera);
					renderer.clearDepth();
					renderer.render(PictScene[21], camera);
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[11], camera);
					renderer.clearDepth();
					renderer.render(PictScene[22], camera);
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[27], camera);
					renderer.clearDepth();
					renderer.render(PictScene[16], camera);
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[28], camera);
					renderer.clearDepth();
					renderer.render(PictScene[15], camera);
				}
				renderer.render(PictScene[30], camera);
			}
		
			if(Departure == 'TenjinSouthStation' || Destination == 'TenjinSouthStation'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[22], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[10], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_1AB' || Destination == 'bus_1AB'){
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[22], camera);
					renderer.render(scene_route[55], camera);
					renderer.clearDepth();
					renderer.render(PictScene[10], camera);
				}
				else if(Departure == 'bus_1C' || Destination == 'bus_1C'){
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[24], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[12], camera);
				}
				else if(Departure == 'bus_2AB' || Destination == 'bus_2AB'){
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[20], camera);
					renderer.render(scene_route[52], camera);
					renderer.clearDepth();
					renderer.render(PictScene[8], camera);
				}
				else if(Departure == 'bus_3' || Destination == 'bus_3'){
					renderer.render(scene_route[0], camera);
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[33], camera);
					renderer.clearDepth();
					renderer.render(PictScene[1], camera);
				}
				else if(Departure == 'bus_4ABC' || Destination == 'bus_4ABC'){
					renderer.render(scene_route[29], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[106], camera);
					renderer.clearDepth();
					renderer.render(PictScene[21], camera);
				}
				else if(Departure == 'bus_7ABC' || Destination == 'bus_7ABC'){
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[18], camera);
					renderer.render(scene_route[48], camera);
					renderer.clearDepth();
					renderer.render(PictScene[6], camera);
				}
				else if(Departure == 'bus_9ABC' || Destination == 'bus_9ABC'){
					renderer.render(scene_route[1], camera);
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[32], camera);
					renderer.clearDepth();
					renderer.render(PictScene[0], camera);
					renderer.render(labelSceneE1a, camera);
				}
				else if(Departure == 'bus_10' || Destination == 'bus_10'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[15], camera);
					renderer.clearDepth();
					renderer.render(PictScene[17], camera);
				}
				else if(Departure == 'bus_11' || Destination == 'bus_11'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[13], camera);
					renderer.clearDepth();
					renderer.render(PictScene[19], camera);
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[12], camera);
					renderer.clearDepth();
					renderer.render(PictScene[20], camera);
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[14], camera);
					renderer.clearDepth();
					renderer.render(PictScene[18], camera);
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[16], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
					renderer.render(PictScene[4], camera);
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[31], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
					renderer.render(PictScene[3], camera);
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[30], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.clearDepth();
					renderer.render(PictScene[2], camera);
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[0], camera);
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
					renderer.render(PictScene[1], camera);
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[1], camera);
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
					renderer.render(PictScene[0], camera);
					renderer.render(labelSceneE1b, camera);
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[1], camera);
					renderer.render(scene_route[2], camera);
					renderer.render(scene_route[3], camera);
					renderer.render(scene_route[4], camera);
					renderer.render(scene_route[5], camera);
					renderer.render(scene_route[6], camera);
					renderer.render(scene_route[7], camera);
					renderer.render(scene_route[8], camera);
					renderer.render(scene_route[9], camera);
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
					renderer.render(PictScene[0], camera);
					renderer.render(labelSceneE1b, camera);
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[25], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
					renderer.render(PictScene[13], camera);
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[26], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
					renderer.render(PictScene[14], camera);
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[29], camera);
					renderer.render(scene_route[105], camera);
					renderer.clearDepth();
					renderer.render(PictScene[21], camera);
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[11], camera);
					renderer.clearDepth();
					renderer.render(PictScene[22], camera);
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[27], camera);
					renderer.clearDepth();
					renderer.render(PictScene[16], camera);
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[10], camera);
					renderer.render(scene_route[28], camera);
					renderer.clearDepth();
					renderer.render(PictScene[15], camera);
				}
				renderer.render(PictScene[31], camera);
			}
		
			
			if(Departure == 'bus_1AB' || Destination == 'bus_1AB'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_1C'|| Destination == 'bus_1C'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_2AB'|| Destination == 'bus_2AB'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_3'|| Destination == 'bus_3'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_4ABC'|| Destination == 'bus_4ABC'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_7ABC'|| Destination == 'bus_7ABC'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_9ABC'|| Destination == 'bus_9ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_10'|| Destination == 'bus_10'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_11'|| Destination == 'bus_11'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_12'|| Destination == 'bus_12'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_13A'|| Destination == 'bus_13A'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[83], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_14'|| Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15'|| Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16'|| Destination == 'bus_16'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17'|| Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC'|| Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB'|| Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E'|| Destination == 'bus_kego_E'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W'|| Destination == 'bus_kego_W'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E'|| Destination == 'bus_T1_E'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W'|| Destination == 'bus_T1_W'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N'|| Destination == 'bus_TS_N'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S'|| Destination == 'bus_TS_S'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[33], camera);
			}
		
			if(Departure == 'bus_1C' || Destination == 'bus_1C'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[119], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_2AB' || Destination == 'bus_2AB'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_3' || Destination == 'bus_3'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_4ABC' || Destination == 'bus_4ABC'){
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_7ABC' || Destination == 'bus_7ABC'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_9ABC' || Destination == 'bus_9ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_10' || Destination == 'bus_10'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[120], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_11' || Destination == 'bus_11'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[34], camera);
			}
		
			if(Departure == 'bus_2AB' || Destination == 'bus_2AB'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_3' || Destination == 'bus_3'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_4ABC' || Destination == 'bus_4ABC'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_7ABC' || Destination == 'bus_7ABC'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_9ABC' || Destination == 'bus_9ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_10' || Destination == 'bus_10'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_11' || Destination == 'bus_11'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[83], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[35], camera);
			}
		
			if(Departure == 'bus_3' || Destination == 'bus_3'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_4ABC' || Destination == 'bus_4ABC'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_7ABC' || Destination == 'bus_7ABC'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[47], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_9ABC' || Destination == 'bus_9ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[34], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_10' || Destination == 'bus_10'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_11' || Destination == 'bus_11'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[83], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[33], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[36], camera);
			}
		
			if(Departure == 'bus_4ABC' || Destination == 'bus_4ABC'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_7ABC' || Destination == 'bus_7ABC'){
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_9ABC' || Destination == 'bus_9ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_10' || Destination == 'bus_10'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_11' || Destination == 'bus_11'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[83], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[57], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[67], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[66], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[37], camera);
			}
		
			if(Departure == 'bus_7ABC' || Destination == 'bus_7ABC'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_9ABC' || Destination == 'bus_9ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_10' || Destination == 'bus_10'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_11' || Destination == 'bus_11'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[83], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[47], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[66], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[38], camera);
			}
		
			if(Departure == 'bus_9ABC' || Destination == 'bus_9ABC'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_10' || Destination == 'bus_10'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_11' || Destination == 'bus_11'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[83], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[32], camera);
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[66], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[39], camera);
			}
		
			if(Departure == 'bus_10' || Destination == 'bus_10'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[119], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_11' || Destination == 'bus_11'){
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[84], camera);
					renderer.render(scene_route[86], camera);
					renderer.render(scene_route[92], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[79], camera);
					renderer.render(scene_route[86], camera);
					renderer.render(scene_route[92], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[75], camera);
					renderer.render(scene_route[79], camera);
					renderer.render(scene_route[86], camera);
					renderer.render(scene_route[92], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[112], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[120], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[120], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[120], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[92], camera);
					renderer.render(scene_route[120], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[40], camera);
			}
		
			if(Departure == 'bus_11' || Destination == 'bus_11'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_12' || Destination == 'bus_12'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[84], camera);
					renderer.render(scene_route[86], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[79], camera);
					renderer.render(scene_route[86], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[75], camera);
					renderer.render(scene_route[79], camera);
					renderer.render(scene_route[86], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[112], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[90], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[41], camera);
			}
		
			if(Departure == 'bus_12' || Destination == 'bus_12'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_13A' || Destination == 'bus_13A'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[81], camera);
					renderer.render(scene_route[85], camera);
					renderer.render(scene_route[88], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[85], camera);
					renderer.render(scene_route[88], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[71], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[85], camera);
					renderer.render(scene_route[88], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[71], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[85], camera);
					renderer.render(scene_route[88], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[87], camera);
					renderer.render(scene_route[93], camera);
					renderer.render(scene_route[104], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[87], camera);
					renderer.render(scene_route[93], camera);
					renderer.render(scene_route[111], camera);
					renderer.render(scene_route[113], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[88], camera);
					renderer.render(scene_route[89], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[42], camera);
			}
		
			if(Departure == 'bus_13A' || Destination == 'bus_13A'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_14' || Destination == 'bus_14'){
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[83], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[79], camera);
					renderer.render(scene_route[84], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[83], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[75], camera);
					renderer.render(scene_route[79], camera);
					renderer.render(scene_route[84], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[83], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[83], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[83], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[43], camera);
			}
		
			if(Departure == 'bus_14' || Destination == 'bus_14'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_15' || Destination == 'bus_15'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[81], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[40], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[71], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[81], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[71], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[81], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[80], camera);
					renderer.render(scene_route[81], camera);
					renderer.render(scene_route[93], camera);
					renderer.render(scene_route[104], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[80], camera);
					renderer.render(scene_route[81], camera);
					renderer.render(scene_route[93], camera);
					renderer.render(scene_route[111], camera);
					renderer.render(scene_route[113], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[43], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[82], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[82], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[44], camera);
			}
		
			if(Departure == 'bus_15' || Destination == 'bus_15'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_16' || Destination == 'bus_16'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[75], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[79], camera);
					renderer.render(scene_route[86], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[79], camera);
					renderer.render(scene_route[86], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[112], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[76], camera);
					renderer.render(scene_route[77], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[45], camera);
			}
		
			if(Departure == 'bus_16' || Destination == 'bus_16'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_17' || Destination == 'bus_17'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[71], camera);
					renderer.render(scene_route[72], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[71], camera);
					renderer.render(scene_route[72], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[80], camera);
					renderer.render(scene_route[93], camera);
					renderer.render(scene_route[104], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[80], camera);
					renderer.render(scene_route[93], camera);
					renderer.render(scene_route[111], camera);
					renderer.render(scene_route[113], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[72], camera);
					renderer.render(scene_route[73], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[46], camera);
			}
		
			if(Departure == 'bus_17' || Destination == 'bus_17'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[34], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[74], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[75], camera);
					renderer.render(scene_route[79], camera);
					renderer.render(scene_route[86], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[75], camera);
					renderer.render(scene_route[79], camera);
					renderer.render(scene_route[86], camera);
					renderer.render(scene_route[91], camera);
					renderer.render(scene_route[94], camera);
					renderer.render(scene_route[97], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[112], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[121], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[36], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[74], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[47], camera);
			}
		
			if(Departure == 'bus_18ABC' || Destination == 'bus_18ABC'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[71], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[80], camera);
					renderer.render(scene_route[93], camera);
					renderer.render(scene_route[104], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[71], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[80], camera);
					renderer.render(scene_route[93], camera);
					renderer.render(scene_route[111], camera);
					renderer.render(scene_route[113], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[48], camera);
			}
		
			if(Departure == 'bus_19AB' || Destination == 'bus_19AB'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[119], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[71], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[80], camera);
					renderer.render(scene_route[93], camera);
					renderer.render(scene_route[104], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[71], camera);
					renderer.render(scene_route[78], camera);
					renderer.render(scene_route[80], camera);
					renderer.render(scene_route[93], camera);
					renderer.render(scene_route[111], camera);
					renderer.render(scene_route[113], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[37], camera);
					renderer.render(scene_route[39], camera);
					renderer.render(scene_route[42], camera);
					renderer.render(scene_route[46], camera);
					renderer.render(scene_route[49], camera);
					renderer.render(scene_route[51], camera);
					renderer.render(scene_route[52], camera);
					renderer.render(scene_route[53], camera);
					renderer.render(scene_route[54], camera);
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[35], camera);
					renderer.render(scene_route[38], camera);
					renderer.render(scene_route[41], camera);
					renderer.render(scene_route[44], camera);
					renderer.render(scene_route[45], camera);
					renderer.render(scene_route[48], camera);
					renderer.render(scene_route[50], camera);
					renderer.render(scene_route[58], camera);
					renderer.render(scene_route[60], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[68], camera);
					renderer.render(scene_route[69], camera);
					renderer.render(scene_route[70], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[49], camera);
			}
		
			if(Departure == 'bus_kego_E' || Destination == 'bus_kego_E'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[99], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[112], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[107], camera);
					renderer.render(scene_route[108], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[110], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[50], camera);
			}
		
			if(Departure == 'bus_kego_W' || Destination == 'bus_kego_W'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[99], camera);
					renderer.render(scene_route[100], camera);
					renderer.render(scene_route[103], camera);
					renderer.render(scene_route[109], camera);
					renderer.render(scene_route[112], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[115], camera);
					renderer.render(scene_route[116], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[51], camera);
			}
		
			if(Departure == 'bus_T1_E' || Destination == 'bus_T1_E'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.render(scene_route[119], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
					renderer.render(scene_route[104], camera);
					renderer.render(scene_route[111], camera);
					renderer.render(scene_route[113], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[105], camera);
					renderer.render(scene_route[106], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[52], camera);
			}
		
			if(Departure == 'bus_T1_W' || Destination == 'bus_T1_W'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.render(scene_route[119], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.clearDepth();
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[113], camera);
					renderer.render(scene_route[114], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[53], camera);
			}
		
			if(Departure == 'bus_TS_N' || Destination == 'bus_TS_N'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[64], camera);
					renderer.render(scene_route[67], camera);
					renderer.render(scene_route[119], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				else if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
					renderer.render(scene_route[65], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[67], camera);
					renderer.clearDepth();
				}
				renderer.render(PictScene[54], camera);
			}
		
			if(Departure == 'bus_TS_S' || Destination == 'bus_TS_S'){
				if(Destination == 'bus_BT'){
					renderer.render(scene_route[55], camera);
					renderer.render(scene_route[56], camera);
					renderer.render(scene_route[59], camera);
					renderer.render(scene_route[61], camera);
					renderer.render(scene_route[62], camera);
					renderer.render(scene_route[63], camera);
					renderer.render(scene_route[66], camera);
					renderer.render(scene_route[119], camera);
					renderer.render(scene_route[120], camera);
					renderer.clearDepth();
					renderer.render(PictScene[32], camera);
					renderer.render(PictScene[25], camera);
				}
				renderer.render(PictScene[55], camera);
			}
		}
	};
	
	onResize();
	
	//リサイズイベント発生時に実行
	window.addEventListener('resize', onResize);
	
	function onResize(){
		//サイズを取得
		const Width = window.innerWidth;
		const Height = window.innerHeight;
		
		//レンダラーのサイズを調整する
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(Width, Height);
		
		camera.aspect = Width / Height;
		camera.updateProjectionMatrix();
	}
};