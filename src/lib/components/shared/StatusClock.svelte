<script>
	/** @type {{ variant?: 'lock' | 'taskbar' | 'time' }} */
	let { variant = 'time' } = $props();

	const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const MONTHS = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	function pad(n) {
		return n < 10 ? '0' + n : '' + n;
	}

	let now = $state(new Date());

	$effect(() => {
		const id = setInterval(() => (now = new Date()), 15000);
		return () => clearInterval(id);
	});

	const time = $derived(pad(now.getHours()) + ':' + pad(now.getMinutes()));
	const dateLong = $derived(
		DAYS[now.getDay()] + ', ' + now.getDate() + ' ' + MONTHS[now.getMonth()] + ' ' + now.getFullYear()
	);
	const dateShort = $derived(pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear());
</script>

{#if variant === 'lock'}
	<div class="lock-clock">
		<div class="lock-date">{dateLong}</div>
		<div class="lock-time">{time}</div>
	</div>
{:else if variant === 'taskbar'}
	<div class="tb-clock">{time}<span class="d">{dateShort}</span></div>
{:else}
	<span class="time-only">{time}</span>
{/if}

<style>
	.lock-clock {
		text-align: center;
	}
	.lock-date {
		font-size: 14px;
		color: var(--sub);
		margin-bottom: 8px;
		letter-spacing: 0.02em;
	}
	.lock-time {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(48px, 11vw, 96px);
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
		text-shadow: 0 2px 40px rgba(75, 232, 206, 0.15);
	}
	.tb-clock {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--ink);
		text-align: right;
		font-variant-numeric: tabular-nums;
		line-height: 1.25;
		padding: 0 2px;
	}
	.tb-clock .d {
		color: var(--sub);
		font-size: 10.5px;
		display: block;
	}
	.time-only {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}
</style>
