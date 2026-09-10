<script>
	import { person, contact } from '$lib/content.js';

	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(person.email);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (e) {
			// Clipboard API unavailable — the mailto link and visible address still work.
		}
	}
</script>

<div class="app-content">
	<h2>Contact</h2>
	<p>{contact.body}</p>
	<div class="contact-links">
		<a class="clink" href="mailto:{person.email}">{person.email}</a>
		<button class="copy-btn" onclick={copyEmail}>{copied ? 'Copied' : 'Copy email'}</button>
	</div>
	<div class="contact-links" style="margin-top: 10px;">
		<a class="clink" href={person.linkedin} target="_blank" rel="noopener">LinkedIn</a>
		<a class="clink" href={person.github} target="_blank" rel="noopener">GitHub</a>
		<a class="clink" href={person.instagram} target="_blank" rel="noopener">Instagram</a>
	</div>
</div>
