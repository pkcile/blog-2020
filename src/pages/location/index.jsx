import  "./index.less"
import {useEffect, useState} from 'react'
import  { api } from "../../util/request.js"
export default function Location() {
	// 获取 GPU 信息
	let [gpuInfor, setGpuInfor] = useState(getGPUInfo())
	let [location, setLocation] = useState()
	let [locationInfo, setLocationInfo] = useState()
	function getGPUInfo() {
		const canvas = document.createElement('canvas');
		const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		if (gl) {
			const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
			if (debugInfo) {
				return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
			}
		}
		return '无法获取 GPU 信息';
	}
	useEffect(() => {
		api.get('/query', {studyth: 123, password: 1}).then(res => {
		})
	})

	return (
		<div
			style="height: 100%; width: 100%;background:#fff;"
		>
			<div
				className="top-update-location"
			>
				<div></div>
				<div className="updatelocation">
					<svg class="octicon octicon-smiley smile-svg" viewBox="0 0 1024 1024" version="1.1">
						<path d="M1024 132v240H784v-80h100.048C807.264 161.304 667.704 80 512 80c-238.2 0-432 193.8-432 432H0c0-136.76 53.256-265.336 149.96-362.04C246.664 53.256 375.24 0 512 0c105.176 0 206.24 31.664 292.264 91.56A512.424 512.424 0 0 1 944 236.968V132h80zM514 944c-155.704 0-295.264-81.304-372.048-212H238v-80H0v240h80V783.872a512.216 512.216 0 0 0 141.736 148.56C307.76 992.344 408.824 1024 514 1024c136.68 0 264.928-53.288 361.12-150.048C971.12 777.384 1024 648.84 1024 512h-80c0 238.2-192.896 432-430 432z m40-496a40 40 0 1 0-80 0 40 40 0 0 0 80 0zM390.624 666.32C325.184 583.568 292 511.2 292 451.208v-5.504c0-121.248 98.696-219.896 220-219.896s220 98.64 220 219.896v5.504c0 60-33.176 132.36-98.624 215.112-46.4 58.664-92.296 101.264-94.224 103.056L512 794.472l-27.152-25.096c-1.936-1.792-47.824-44.392-94.224-103.056z m62.104-50.456c21.392 27.136 43.008 50.832 59.272 67.744 16.264-16.912 37.872-40.608 59.28-67.744 52.048-65.992 80.72-124.48 80.72-164.656v-5.504c0-77.144-62.8-139.896-140-139.896S372 368.56 372 445.704v5.504c0 40.184 28.672 98.664 80.72 164.656z" p-id="5990"></path>
					</svg>
				</div>
			</div>

			<div class="container">
				<div className="container-main">
					<div class="form-group">
						<label for="studentId">设备信息</label>
						<input type="text" id="studentId" value={gpuInfor} readOnly />
					</div>
					<div class="form-group">
						<label for="name">位置信息</label>
						<input type="text" id="name" value="王朋坤" readonly />
					</div>
					<div class="form-group">
						<label for="class">备注</label>
						<input type="text" id="class" value="18级地理信息科学2班" readonly />
					</div>
				</div>

				<div className="container-footer">
					<button class="update-btn">更新位置</button>
				</div>
			</div>

		</div>
	);
}
