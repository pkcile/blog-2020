export default function NotFound2() {
	return (
		<div
			style="padding: 10px 30px;background-color:#000;height:100%;width:100%;box-sizing:border-box;"
		>
			<h1 style={{
				color: "white",
				fontSize: "1.5rem",
				margin: "20px 10px 20px 10px",
				fontWeight: "600",
			}}>嗯404了</h1>
			<h1
				style={{
					color: "white",
					fontSize: "1.2rem",
					fontWeight: "400",
					margin: "10px"
				}}
			>
				<a
					style={{
						textDecoration: "underline",
						color: "#fff"
					}}

					href="/">请跳转回主页</a></h1>
		</div>
	);
}
