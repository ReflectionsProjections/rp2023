<script lang="ts">
	import SpeakerCard from '$lib/components/speaker-card.svelte';
	import type { Speaker } from '$lib/types';
	import ShootingStar from '../../components/shooting-star.svelte';

	const speakers: Speaker[] = [
		// {
		// 	id: 'chris-earney',
		// 	name: 'Chris Earney',
		// 	role: 'Head of United Nations Future Lab',
		// 	organization: 'United Nations',
		// 	bio: "Chris Earney serves as the Head of United Nations Future Lab and has worked as the Deputy Director of United Nations from May 2021 to Jun 2023. Within the United Nations, he has held the positions of Head the Crisis Insights Team within the Executive Office of the Secretary General. Earney has also worked with the United Nations High Commissioner for Refugees (UNHCR) as both the Head of the UN Refugee Agency's Innovation Service and co-founder of the Innovation Team."
		// },
		{
			id: 'alex-abramson',
			name: 'Alex Abramson',
			role: 'Assistant Professor of Chemical and Biomolecular Engineering at Georgia Tech',
			organization: 'Georgia Tech',
			bio: ''
		},
		{
			id: 'archana-chaudhary',
			name: 'Archana Chaudhary',
			role: 'Senior Engineering Manager at Adobe',
			organization: 'Adobe',
			bio: 'I am Archana Chaudhary, Senior Engineering Manager at Adobe. I currently manage a software development team in Adobe Experience Cloud, where we build Mobile SDKs. These SDKs enable companies to know their users better and provide personalized experiences for engaging mobile engagement. Previously, I managed multiple development teams working in Adobe EchoSign, worked in startups, worked in Electronic Design Automation and did lots of volunteering. Outside of the workplace, I am a mentor to many women in tech, I work with women from 20 years old to 60+ year old. For last 5 years I run a summer mobile app development program as part of my SEEDS program, this program has empowered 150+ college girls to learn how to create socially useful mobile apps. '
		},
		{
			id: 'ashwin-jadhav',
			name: 'Ashwin Jadhav',
			role: 'Vice President, Business Development at Twelve',
			organization: 'Twelve',
			bio: "Ashwin Jadhav is the Vice President of Business Development of Twelve, a chemical company for the climate era that makes everyday products from air instead of oil. At Twelve, Ashwin oversees the customer acquisition, sales and commercial strategy of Twelve's sustainable aviation fuel (SAF) products.\n In 2023, he was named in the Top 20 Under 40 in Canada's Aviation Industry by Wings Magazine.\n Ashwin brings over 15 years of aviation industry experience in business development, sales, and marketing, including his leadership of a commercial deal-making ecosystem worth $500M+ per year in new engine sales for aircraft engine manufacturer Pratt & Whitney. He also led commercial strategy and forecasting for the Q400, CRJ Series, and C Series (now Airbus A220) aircraft at Bombardier and held leadership roles at the International Air Transport Association. In addition to his current position at Twelve, he serves on the boards of Muskoka Airport (YQA), the Forum of European Aerospace Market Analysts (FEAMA), and the Transportation Research Board (TRB). Ashwin has a degree in Executive Leadership from the West Point Military Academy, and an M.S. in Aerospace Engineering from the University of Illinois at Urbana-Champaign. He speaks English, French, Russian and Hindi."
		},
		{
			id: 'brian-martin',
			name: 'Brian Martin',
			role: 'Head of AI, R&D Information Research, Research Fellow at AbbVie',
			organization: 'AbbVie',
			bio: "Brian leads the RAIDERS team within AbbVie's Research & Development’s Information Research division, focused on accelerating, scaling, and amplifying the work of AbbVie’s R&D community using Artificial Intelligence technologies like machine learning, deep learning, graph computation, and cognitive computing.  Brian came to AbbVie after spending five years in technology consulting across many industries, and over a decade of additional experience before that working in trading and financial markets technology.\n While his primary focus is AI technologies, he was also a co-founder of the QuPharm quantum computing community and the Pistoia/QED-C Quantum Community of Interest.  He is a frequent presenter at conferences on topics as diverse as optical networking, quantum computing, blockchain, cognitive architecture, and other emerging technologies that are all part of digital transformation.\n Brian holds a B.S. degree in Computer and Cognitive Science from Alma College and a M.S in Computer Science from the University of Chicago."
		},
		{
			id: 'craig-schultz',
			name: 'Craig Schultz',
			role: 'Co-Founder and CTO at Fluid Reality Inc',
			organization: 'Fluid Reality Inc',
			bio: "Craig is co-founder and CTO of Fluid Reality, a spinout commercializing his post doctoral work in miniaturized soft hydraulic actuation at the Human-Computer Interaction Institute at Carnegie Mellon University in the Future Interfaces Group. He's the inventor of Flat Panel Haptics and specializes in interactive embedded systems and haptic actuation. His work has won 6 best paper awards and nominations at premiere ACM and IEEE venues and has been featured in venues such as NBC Nightly News with Lester Holt, TechCrunch, and Engadget. Before CMU and Fluid Reality, Craig was the VP of Research and Development at Tanvas, where he developed novel electroadhesive touchscreens based on his PhD work in surface haptics at Northwestern University's Center for Robotics and Biosystems. Craig currently holds an adjunct professor position at UIUC ECE."
		},
		{
			id: 'emily-bender',
			name: 'Emily M. Bender',
			role: 'Professor of Linguistics and Adjunct Professor in the School of Computer Science and Information Science at the University of Washington',
			organization: 'University of Washington',
			bio: 'Emily M. Bender is a Professor of Linguistics and an Adjunct Professor in the School of Computer Science and the Information School at the University of Washington, where she has been on the faculty since 2003. Her research interests include  multilingual grammar engineering, computational semantics, and the societal impacts of language technology.  She is the co-author of recent influential papers such as Climbing towards NLU: On Meaning, Form, and Understanding in the Age of Data (ACL 2020), On the Dangers of Stochastic Parrots: Can Language Models Be Too Big? 🦜(FAccT 2021), and AI and the Everything in the Whole Wide World Benchmark (NeurIPS 2021). In 2022 she was elected as a Fellow of the American Association for the Advancement of Science (AAAS).\nWebsite: http://faculty.washington.edu/ebender/'
		},
		{
			id: 'josh-starmer',
			name: 'Josh Starmer',
			role: 'Found and CEO at StatQuest Co. and Lead AI Educator at Lightning AI',
			organization: 'StatQuest Co. and Lightning AI',
			bio: 'Josh Starmer is the person behind the popular YouTube channel, “StatQuest with Josh Starmer.” Since 2016, Josh has used an innovative and unique visual style to clearly explain Statistics, Data Science and Machine Learning concepts and algorithms to curious people all over the world.'
		},
		{
			id: 'mark-guzdial',
			name: 'Mark Guzdial',
			role: 'Director of PCAS at the University of Michigan',
			organization: 'University of Michigan',
			bio: 'Mark Guzdial is the Director of the Program in Computing for the Arts and Sciences (PCAS) in the College of Literature, Science, and the Arts at the University of Michigan. He is also a Computer Science & Engineering Professor who wrote the 2015 book “Learner-Centered Design of Computing Education: Research on Computing for Everyone.” He is an ACM Distinguished Educator and a Fellow of the ACM.'
		},
		{
			id: 'meghana-joglekar',
			name: 'Meghana Joglekar',
			role: 'Tech Director, Amazon Music - Monetization and Identity',
			organization: 'Amazon',
			bio: 'Meghana Joglekar is a tech director at Amazon Music and runs their monetization and identity orgs. After graduating at the top of her class in 1997 at University of Mumbai, Electrical Engineering program, she started her tech career with Tata Infotech. Over the years, she has built her leadership experience at Cisco and Amazon. Now a veteran at Amazon after 11years, she takes pride in encouraging and promoting diversity and inclusion at work place.'
		},
		{
			id: 'setor-zilevu',
			name: 'Setor Zilevu',
			role: 'Lead User Experience Researcher at Meta',
			organization: 'Meta',
			bio: ''
		},
		{
			id: 'sue-harnett',
			name: 'Sue Harnett',
			role: 'Founder and CEO at Rewriting the Code',
			organization: 'Rewriting The Code',
			bio: 'Sue is a proven company founder, entrepreneur and healthcare leader. Prior to Rewriting the Code, Sue launched, developed and successfully sold a novel e-commerce and technology business in the collegiate and professional sports industry. Sue also created the strategic vision and operational infrastructure for a multi-specialty physician organization within Duke University Health System, a nationally acclaimed academic health system. She is an expert at recognizing the viability of business opportunities, testing the market to refine the proposed model and executing the go-to-market strategy. She brings a strong ability to create passionate teams, establish focused and positive work cultures and lead disruptive business models to bring innovative change. Sue hopes to positively impact the young college women of Rewriting the Code by supporting the students with the necessary skills, confidence and applied work opportunities to develop the next generation of technology leaders.\n Sue received her Masters in Healthcare Administration from Duke University in 1992 and an AB in Economics from Duke University in 1990. Sue earned a full scholarship to Duke where she received All-America honors prior to playing professional basketball in Kortrijk, Belgium.'
		}
	];
</script>

<div class="h-full text-black">
	<ShootingStar />

	<span class="w-full flex flex-col items-center">
		<div class="font-serif text-3xl text-white mt-10 mb-20">Speakers</div>

		{#each speakers as speaker}
			<SpeakerCard {speaker} />
		{/each}
	</span>
</div>

<!-- Alex Abramson -------------------------------------------------------------------------->
<!-- <span
			class="w-2/3 flex flex-col md:flex-row mx-auto p-2 mb-10 md:p-5 bg-rp-cream rounded-xl md:bg-[url(src/assets/sun-vector.png)] bg-no-repeat"
		>
			<div class="md:w-1/4 flex flex-col items-center justify-center md:mr-4 text-2xl">
				<div
					class="flex flex-col items-center text-center text-2xl bg-rp-hot-pink text-white rounded-xl p-2"
				>
					Alex Abramson
				</div>
				<div class="w-full flex justify-center items-center mt-2">
					<img
						src="src/assets/alex-abramson.jpeg"
						alt="Alex Abramson"
						class="w-24 h-24 object-cover rounded-full"
					/>
				</div>
			</div>
			<div class="md:w-3/4 flex flex-col font-sans mt-2">
				<div class="">
					<p class="underline decoration-wavy font-bold decoration-rp-hot-pink p-2 inline-block">
						Assistant Professor of Chemical and Biomolecular Engineering @ Georgia Tech
					</p>
				</div>
				<div>(Speaker Bio Empty)</div>
			</div>
		</span>
		<br />
	</span>
</div> -->