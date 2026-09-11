// Single source of truth for every section's copy — verbatim from the build document.
// Both the desktop and mobile shells import from here; nothing is duplicated by hand.

export const person = {
	name: 'Anshad K',
	role: 'Mechatronics Engineer',
	email: 'anshadelayoor@gmail.com',
	linkedin: 'https://www.linkedin.com/in/anshad-k-elmentrix',
	github: 'https://github.com/Anshad-elayoor',
	instagram: 'https://www.instagram.com/er.anshad'
};

export const sections = [
	{ id: 'about', label: 'About', icon: 'user', title: 'About' },
	{ id: 'work', label: 'Work', icon: 'compass', title: 'TechCon26 event platform' },
	{ id: 'projects', label: 'Projects', icon: 'cube', title: 'Projects' },
	{ id: 'experience', label: 'Experience', icon: 'calendar', title: 'Experience & education' },
	{ id: 'research', label: 'Research', icon: 'doc', title: 'Research' },
	{ id: 'teaching', label: 'Teaching', icon: 'board', title: 'Teaching & talks' },
	{ id: 'skills', label: 'Skills', icon: 'gear', title: 'Skills' },
	{ id: 'elmentrix', label: 'ELMENTRIX', icon: 'spark', title: 'ELMENTRIX' },
	{ id: 'gallery', label: 'Gallery', icon: 'pinwheel', title: 'Gallery' },
	{ id: 'contact', label: 'Contact', icon: 'phone', title: 'Contact' }
];

export const dockLinks = [
	{ id: 'email', label: 'Email', href: `mailto:${person.email}` },
	{ id: 'li', label: 'LinkedIn', href: person.linkedin },
	{ id: 'gh', label: 'GitHub', href: person.github },
	{ id: 'ig', label: 'Instagram', href: person.instagram }
];

export const about = {
	paragraphs: [
		"I'm a mechatronics engineer from Kerala. I started with motors, sensors and microcontrollers, and I still think best with hardware on the bench.",
		'I spent about two years with Bairuha Tech, first on robotics research and development, then at its robotics education division, Aisotop, where I led robotics and STEAM education work. There I assembled and commissioned a FarmBot farming robot and ran hands-on workshops for school and college students.',
		'In 2026 I taught myself to build software with AI-assisted development. I used it to deliver the complete event platform for TechCon26, which handled more than 13,000 registrations.',
		"Today I'm doing my M.Tech in VLSI, running ELMENTRIX, and learning ROS 2. Outside work, I've kept a daily German-learning streak for more than 1,100 days."
	]
};

export const work = {
	summary:
		'I rebuilt a stalled conference platform on my own in under two months and ran it live for a three-day tech convention.',
	context:
		'TechCon26 was organised by TechFed Kerala from 3 to 5 September 2026 in Kochi, across the KINFRA International Exhibition cum Convention Centre and JAIN University Kochi, with 32 programmes including conference sessions, competitions, workshops and a placement drive.',
	problem:
		'I joined as part of the media team. The first development phase had stalled, the original team could not take it further, and the event date was already fixed. I offered to finish it.',
	built: [
		'Event registration and payments',
		'Live QR gate scanning and registration verification across multiple venue zones',
		'Volunteer registration, ID verification and attendance',
		'Campus ambassador registration and referral tracking',
		'Department-specific portals',
		'An esports competition portal with its own organiser logins',
		'A campus-wide treasure hunt game platform with its own authentication system',
		'Three separate operator consoles for planning and for gate operations'
	],
	stats: [
		{ value: '13,000+', label: 'registrations' },
		{ value: '6,500+', label: 'scanned in' },
		{ value: '3,000+', label: 'scans, peak hour' }
	],
	closing: 'The system ran through the event without major server issues.',
	stack: 'Firebase backend, built with AI-assisted development.',
	link: { label: 'Visit techcon26.org', href: 'https://techcon26.org' }
};

export const projects = [
	{
		title: 'Artificial neuron in Verilog',
		status: 'simulation',
		summary:
			'A hardware model of an artificial neuron, designed as digital logic in Verilog HDL and verified in simulation.',
		context: 'M.Tech project, Nehru College of Engineering and Research Centre, Jan–Apr 2026',
		builtWith: 'Verilog HDL, digital design'
	},
	{
		title: 'Smart blackboard writing and cleaning system',
		status: 'completed',
		summary:
			'A writing and cleaning mechanism driven by NEMA 17 stepper motors and a servo motor, running GRBL on an Arduino Uno with a CNC Shield V3 and A4988 drivers; drawings are converted to G-code in Inkscape.',
		context: 'B.Tech project, Malabar College of Engineering and Technology — published in IJCRT, April 2024',
		builtWith: 'Arduino Uno, GRBL, CNC Shield V3, A4988, NEMA 17, Inkscape',
		link: { label: 'Read the paper', href: 'https://www.ijcrt.org/papers/IJCRT24A4843.pdf' }
	},
	{
		title: 'Diabetes diagnosis and insulin delivery system',
		status: 'completed',
		summary:
			'A portable device that monitors blood glucose and delivers insulin automatically when glucose rises.',
		context: 'B.Tech project, Jun–Aug 2023 — published in IJSR, August 2023',
		link: { label: 'Read the paper', href: 'https://www.ijsr.net/getabstract.php?paperid=SR23819135738' }
	},
	{
		title: 'FarmBot at Aisotop',
		status: 'completed',
		summary:
			'Assembled and set up a FarmBot kit — an open-source gantry robot that automates seeding, watering and soil monitoring over a raised garden bed.',
		builtWith: 'FarmBot kit, FarmBot web app',
		link: { label: 'About FarmBot', href: 'https://farm.bot' }
	},
	{
		title: 'PromptLingo',
		status: 'on hold',
		summary:
			'A Duolingo-style game for learning prompt engineering. Players complete levels by getting an AI character to say specific words through clever prompting.',
		context: 'Personal project, launched August 2025 with two levels'
	}
];

export const experience = [
	{
		when: 'Jan 2024 – Present',
		role: 'Founder, ELMENTRIX',
		where: 'Kozhikode (Hybrid)',
		body: 'An education technology venture bringing robotics and AI into how students learn.'
	},
	{
		when: 'Mar 2025 – May 2026',
		role: 'Robotics Engineer, Aisotop (a division of Bairuha Tech)',
		where: 'Kozhikode',
		body: 'Led robotics and STEAM education programmes after moving from Bairuha Tech; assembled and commissioned a FarmBot farming robot; ran hands-on workshops at colleges, including Arduino and IoT sessions at KMCT.'
	},
	{
		when: 'Sep 2024 – Jul 2025',
		role: 'Freelance Researcher, Bairuha Tech',
		where: 'Kozhikode (Hybrid)',
		body: 'Robotics research and development, leading to a move to the company’s robotics division, Aisotop, in March 2025.'
	},
	{
		when: 'Nov 2024 – Feb 2025',
		role: 'Robotics Trainer, Hillsinai Finishing School',
		where: 'Adivaram (Part-time)',
		body: 'Taught robotics, programming and STEM to higher secondary students through hands-on projects.'
	},
	{
		when: 'May 2024 – Jul 2024',
		role: 'Robotics Trainer, Fortune Resources Management',
		where: 'Part-time, Hybrid (Riyadh, Saudi Arabia)',
		body: ''
	}
];

export const education = [
	{
		when: 'Sep 2025 – Jun 2027 (expected)',
		role: 'M.Tech, VLSI',
		where: 'Nehru College of Engineering and Research Centre, Pambady',
		body: 'Focus on digital design and low-power VLSI. Current work includes an artificial neuron in Verilog and research on low-power CMOS circuits.'
	},
	{
		when: '2020 – 2024',
		role: 'B.Tech, Mechatronics Engineering',
		where: 'Malabar College of Engineering and Technology, Desamangalam',
		body: 'Two published projects: the smart blackboard system and the diabetes insulin delivery system.'
	}
];

export const research = [
	{
		title:
			'Advances in Low-Power CMOS VLSI: Circuit-Level Optimization and Data-Driven Power Modeling',
		authors: 'Anshad K, Prathul, Abjith, Jishna P',
		venue:
			'Presented at MESMT 2026, International Conference on Modern Trends in Engineering, Science, Management and Technology, online, March 2026. Certificate of Appreciation.'
	},
	{
		title: 'Automatic Blackboard Writing and Cleaning',
		authors: 'Anshad K, Shahal Thayyil, Jishna P, Rashmi V R',
		venue: 'IJCRT, Volume 12, Issue 4, April 2024',
		link: { label: 'Read the paper', href: 'https://www.ijcrt.org/papers/IJCRT24A4843.pdf' }
	},
	{
		title: 'Diabetics Diagnosis and Curing Mechatronics System',
		authors: 'Abhin S P, Anshad K, Joyal Joy, Kiran Jose',
		venue: 'IJSR, Volume 12, Issue 8, August 2023, pages 1892–1894. DOI 10.21275/SR23819135738',
		link: { label: 'Read the paper', href: 'https://www.ijsr.net/getabstract.php?paperid=SR23819135738' }
	}
];

export const teaching = [
	{
		when: 'Apr 2026',
		what: 'Workshop on IoT, 3D design and 3D printing, representing Aisotop',
		where: 'KARMA tech fest, KMCT Engineering College'
	},
	{
		when: 'Jan 2026',
		what: 'Arduino workshop on embedded systems and basic electronics, with the IEEE Student Branch, for Aisotop',
		where: 'KMCT College of Engineering'
	},
	{
		when: 'Dec 2025',
		what: 'Inaugurated the "Digital Feast" robotics and AI event, organised by Cyber Square',
		where: 'AURA Global School, Perinthalmanna'
	},
	{
		when: 'Nov 2024 – Feb 2025',
		what: 'Robotics, programming and STEM training for higher secondary students',
		where: 'Hillsinai Finishing School, Adivaram'
	},
	{
		when: 'May 2024 – Jul 2024',
		what: 'Robotics training',
		where: 'Fortune Resources Management'
	}
];

export const skills = {
	confident: ['Microcontrollers (Arduino, ESP32)', 'IoT systems', 'Sensors and sensor integration'],
	used: [
		'Stepper motors and motor drivers (A4988, GRBL, CNC Shield)',
		'Verilog HDL and digital design',
		'Firebase and web platforms, built with AI-assisted development',
		'3D design and 3D printing',
		'Python',
		'Technical training and workshop delivery'
	],
	learning: ['ROS 2'],
	languages: 'German (learning, 1,100+ day daily streak)'
};

export const elmentrix = {
	body: 'ELMENTRIX is my education technology venture, founded in January 2024. It works on bringing robotics and AI into how students learn. The website is in development.',
	instagram: 'https://www.instagram.com/elmentrix_',
	linkedin: 'https://www.linkedin.com/company/elmentrix'
};

export const gallery = [
	{ file: '2025-11-15-01.jpg', alt: 'Anshad K at a workshop or event' },
	{ file: '2025-11-17-01.jpg', alt: 'Anshad K at a workshop or event' },
	{ file: '2025-11-17-02.jpg', alt: 'Anshad K at a workshop or event' },
	{ file: '2025-11-17-03.jpg', alt: 'Anshad K at a workshop or event' },
	{ file: '2026-03-04-01.jpg', alt: 'Anshad K at a workshop or event' },
	{ file: '2026-03-04-02.jpg', alt: 'Anshad K at a workshop or event' },
	{ file: '2026-03-04-03.jpg', alt: 'Anshad K at a workshop or event' }
];

export const contact = {
	body: 'For roles, workshops, talks or collaborations, email me directly.'
};
