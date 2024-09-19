import "./index.less"
import { useEffect, useState, useRef, lazy } from 'react'
import { api, tiandituquery } from "../../util/request.js"
import Spin from "../spin/index.jsx"
import Select from "../select/index.jsx"
import Notification from "../notification/index.jsx"
import Mapleaflet from "../map/index.jsx"

export default function Location() {
	// 获取 GPU 信息
	let [gpuInfor, setGpuInfor] = useState("")
	let [location, setLocation] = useState({
		accuracy: 0.001,
		latitude:22.5428599,
		longitude: 114.05956,
	})
	let [locationI, setLocationI] = useState()
	let [locationInfo, setLocationInfo] = useState()
	let [comment, setComment] = useState('')
	let [theme, setTheme] = useState('闲来无事')
	let [themOptions, setThemOptions] = useState(['闲来无事', '气定神清', '我心飞翔'])
	let [spinstatus, setSpinstatus] = useState("none")
	let [noticemessageobj, setNoticemessageobj] = useState({
		message: '',
	})
	let [mapstatus, setMapstatus] = useState(false)
	const childRef = useRef();


	const updatelocation = function () {

		setSpinstatus('flex')
		if (!navigator.geolocation) {
			setLocationInfo('请检查浏览器是否支持定位');
		} else {
			navigator.geolocation.getCurrentPosition(function name(sucess) {
				if (sucess?.coords) {
					let lat = sucess.coords.latitude;
					let lon = sucess.coords.longitude;
					tiandituquery.get('', { type: 'geocode', postStr: JSON.stringify({ 'lon': lon, 'lat': lat, 'ver': 1 }), tk: 'c2eac0b552d848155c72b1d3f6aabf36' }).then(res => {
						setSpinstatus('none')
						// let obj = JSON.parse(res);

						setLocation(sucess.coords);
						setLocationInfo(res?.result?.formatted_address + "," + res?.result?.addressComponent?.address);
						setLocationI(lon.toFixed(4) + "," + lat.toFixed(4))
					})
				}


			}, function name(error) {
				console.error(error);
				setSpinstatus('none')
				setLocationInfo('无法获取地理位置信息');
				if (childRef.current) {
					childRef.current.callShowAlert();
					setNoticemessageobj({message: '无法获取地理位置信息 ' + error?.message , type: "error"});
				}
			}, {
				enableHighAccuracy: false,
				// timeout: 1000,
			});
		}
	}
	useEffect(() => {
		const canvas = document.createElement('canvas');
		const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		if (gl) {
			const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
			if (debugInfo) {
				setGpuInfor(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
			}
		}
	}, [])
	return (
		<div
			style="height: 100%; width: 100%;background:#fff; position: fixed; "
		>
			<Spin size={30} color="#f00" displayitem={spinstatus} />
			<Notification noticemessageobj={noticemessageobj} duration={5000} ref={childRef} />
			{mapstatus && <Mapleaflet setMapstatus={setMapstatus} location={location}></Mapleaflet>}
			<div
				className="top-update-location"
			>
				<div></div>
				<div className="updatelocation"
					onClick={updatelocation}
				>
					<svg class="octicon octicon-smiley smile-svg" viewBox="0 0 1024 1024" version="1.1">
						<path d="M1024 132v240H784v-80h100.048C807.264 161.304 667.704 80 512 80c-238.2 0-432 193.8-432 432H0c0-136.76 53.256-265.336 149.96-362.04C246.664 53.256 375.24 0 512 0c105.176 0 206.24 31.664 292.264 91.56A512.424 512.424 0 0 1 944 236.968V132h80zM514 944c-155.704 0-295.264-81.304-372.048-212H238v-80H0v240h80V783.872a512.216 512.216 0 0 0 141.736 148.56C307.76 992.344 408.824 1024 514 1024c136.68 0 264.928-53.288 361.12-150.048C971.12 777.384 1024 648.84 1024 512h-80c0 238.2-192.896 432-430 432z m40-496a40 40 0 1 0-80 0 40 40 0 0 0 80 0zM390.624 666.32C325.184 583.568 292 511.2 292 451.208v-5.504c0-121.248 98.696-219.896 220-219.896s220 98.64 220 219.896v5.504c0 60-33.176 132.36-98.624 215.112-46.4 58.664-92.296 101.264-94.224 103.056L512 794.472l-27.152-25.096c-1.936-1.792-47.824-44.392-94.224-103.056z m62.104-50.456c21.392 27.136 43.008 50.832 59.272 67.744 16.264-16.912 37.872-40.608 59.28-67.744 52.048-65.992 80.72-124.48 80.72-164.656v-5.504c0-77.144-62.8-139.896-140-139.896S372 368.56 372 445.704v5.504c0 40.184 28.672 98.664 80.72 164.656z" p-id="5990"></path>
					</svg>
				</div>
			</div>

			<div class="container" >
				<div className="container-main">
					<div class="form-group">
						<label for="studentId">设备信息</label>
						<div>
							<input type="text" id="studentId" value={gpuInfor} readOnly />
						</div>
					</div>
					<div class="form-group">
						<label for="name">位置信息</label>
						<div>
							<input type="text" id="name" value={locationInfo} readonly style={{ cursor: "pointer" }} onClick={()=> {
								if(locationI) {
									setMapstatus(true)
								} else {
									if (childRef.current) {
										childRef.current.callShowAlert();
										setNoticemessageobj({ message: '请先获取位置', type: "error"})
									}
								}
							}}/>
							{locationI && <input type="text" style={{ color: '#000', marginTop: '10px', cursor: "pointer" }} readonly value={locationI} onClick={()=> {setMapstatus(true)}}></input>}
						</div>
					</div>
					<div class="form-group">
						<label for="class">主题</label>
						<div>
							<Select options={themOptions} placeholder={theme}
								onChange={(value) => {
									setTheme(value)
								}}
							/>
						</div>
					</div>
					<div class="form-group">
						<label for="class">备注</label>
						<div>
							<input type="text" id="class" value={comment}
								onChange={e => setComment(e.target.value)}
							/>
						</div>
					</div>
				</div>

				<div className="container-footer">
					{
						location?.accuracy == 0.001 && <button class="update-btn" onClick={updatelocation}>更新位置</button>
					}
					{
						location?.accuracy != 0.001 && <button class="commit-btn" onClick={function name(params) {
							if (location && location?.latitude) {
								setSpinstatus('flex')
								// 更新
								api.get('/add',
									{
										locationInfo,
										comment,
										theme,
										gpuInfor,
										latitude: location?.latitude,
										longitude: location?.longitude,
										accuracy: location?.accuracy
									}).then(res => {
										if (childRef.current) {
											childRef.current.callShowAlert();
											setNoticemessageobj({ message: '更新位置成功', type: "success"});
											setMapstatus(true)
										}
										setSpinstatus('none')
									})
							}
							// 重新定位
							else {

							}
						}}>位置提交</button>
					}

				</div>
			</div>

		</div>
	);
}
