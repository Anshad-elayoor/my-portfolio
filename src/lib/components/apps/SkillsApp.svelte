<script>
	import { skills } from '$lib/content.js';
</script>

<div class="app-content">
	<h2>Skills</h2>
	<div class="skill-cols">
		<div>
			<h3>Confident</h3>
			<ul>
				{#each skills.confident as s}<li>{s}</li>{/each}
			</ul>
		</div>
		<div>
			<h3>Used in projects</h3>
			<ul>
				{#each skills.used as s}<li>{s}</li>{/each}
			</ul>
		</div>
		<div>
			<h3>Learning</h3>
			<ul>
				{#each skills.learning as s}<li>{s}</li>{/each}
			</ul>
		</div>
	</div>
	<p style="margin-top: 24px;">Languages: {skills.languages}</p>
</div>
