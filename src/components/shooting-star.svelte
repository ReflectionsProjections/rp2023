<div>
	<span />
	<span />
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		animation: 68s linear infinite;
	}
	@keyframes background {
		0% {
			transform: scale(1);
		}
		55% {
			transform: scale(1.3);
		}
		100% {
			transform: scale(1);
		}
	}
	span {
		position: fixed;
		left: 50%;
		top: 45%;
		width: 5px;
		height: 5px;
		background: white;
		border-radius: 50%;
		box-shadow: 0 1px 0 5px rgba(254, 254, 255, 0.2), 0 1px 0 7px rgba(245, 254, 255, 0.1),
			0 1px 21px rgba(253, 253, 245, 1);
		animation: anim 3s ease-in-out infinite;
	}
	span::before {
		content: '';
		width: 200px;
		height: 2px;
		position: absolute;
		top: 53%;
		transform: translateY(-45%);
		background: linear-gradient(90deg, rgba(255, 255, 255, 1), transparent);
	}
	@keyframes anim {
		0% {
			transform: rotate(325deg) translateX(0);
			opacity: 0;
		}
		40% {
			opacity: 0.9;
		}
		70% {
			opacity: 0.7;
		}
		100% {
			transform: rotate(325deg) translateX(-1400px);
			opacity: 0;
		}
	}
	span:nth-child(1) {
		top: -30px;
		right: 50%;
		left: initial;
		animation-delay: 13s;
		animation-duration: 2.3s;
	}
	span:nth-child(2) {
		top: -30px;
		right: 10%;
		left: initial;
		animation-delay: 10s;
		animation-duration: 3.2s;
	}

	@media (max-width: 1250px) {
		span:nth-child(1) {
			top: -30px;
			right: -80%;
			left: initial;
			animation-delay: 13s;
			animation-duration: 2.3s;
		}
		span:nth-child(2) {
			top: -30px;
			right: 5%;
			left: initial;
			animation-delay: 10s;
			animation-duration: 3.2s;
		}
	}
</style>
