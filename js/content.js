/* ==========================================================================
   WBT CONTENT MANIFEST  —  the one file you edit most often.
   --------------------------------------------------------------------------
   Case studies and articles are the content you publish most. To add one:
     1) Add an entry to the array below (newest first).
     2) Copy the matching template and fill it in:
          case-studies/_TEMPLATE.html   ->   case-studies/<slug>.html
          articles/_TEMPLATE.html        ->   articles/<slug>.html
   The "Our Work" and "Blog" index pages render their cards from these arrays
   automatically, including the category filter. No other edits needed.

   Fields:
     slug     - filename without .html (also the URL)
     title    - card + page title
     excerpt  - 1–2 sentence summary shown on the card
     tags     - array of categories; drives the filter chips
     img      - thumbnail, relative to the site root (assets/...)
     date     - articles only, "M/D/YY"
     author   - articles only
   ========================================================================== */

window.WBT_CASE_STUDIES = [
  {
    slug: "coaching-to-support-leadership-development",
    title: "Coaching to Support Leadership Development",
    excerpt: "A 1:1 coaching partnership focused on reflection, skill-building, and more intentional leadership over time.",
    tags: ["Leadership Coaching", "1:1 Coaching"],
    img: "assets/case-studies/coaching-to-support-leadership-development.jpg"
  },
  {
    slug: "moving-from-stress-to-strategy-with-a-team",
    title: "Moving From Stress to Strategy with a Team",
    excerpt: "Structured sessions to slow down reactive decision-making and rebuild a plan the team could actually execute.",
    tags: ["Facilitation"],
    img: "assets/case-studies/moving-from-stress-to-strategy-with-a-team.jpg"
  },
  {
    slug: "campaign-team-retreat-to-align-at-the-start",
    title: "Campaign Team Retreat to Align at the Start",
    excerpt: "A kickoff retreat that helped a campaign team set the norms, routines, and trust needed to move fast together.",
    tags: ["Team Coaching", "Campaign Teams"],
    img: "assets/case-studies/campaign-team-retreat-to-align-at-the-start.jpg"
  },
  {
    slug: "individual-coaching-for-each-team-member",
    title: "Individual Coaching for Each Team Member",
    excerpt: "1:1 coaching for every team member, paired with team development, so growth happened at both levels at once.",
    tags: ["Leadership Coaching", "1:1 Coaching"],
    img: "assets/case-studies/individual-coaching-for-each-team-member.jpg"
  },
  {
    slug: "facilitation-to-prepare-for-uncertainty",
    title: "Facilitation to Prepare for Uncertainty",
    excerpt: "A retreat series to help a team name their fears, normalize the stress response, and prepare for what was coming.",
    tags: ["Facilitation", "Retreat Series"],
    img: "assets/case-studies/facilitation-to-prepare-for-uncertainty.jpg"
  },
  {
    slug: "choosing-the-culture-we-build-on-campaigns",
    title: "Choosing the Culture We Build on Campaigns",
    excerpt: "Facilitation that helped a campaign team choose its own norms around communication, conflict, and workload before pressure could set them instead.",
    tags: ["Team Coaching", "Campaign Teams"],
    img: "assets/case-studies/choosing-the-culture-we-build-on-campaigns.jpg"
  },
  {
    slug: "developing-endurance-and-agency",
    title: "Developing Endurance and Agency",
    excerpt: "1:1 coaching to help a leader sort what they could control from what they could only influence, then lead from that clarity.",
    tags: ["Leadership Coaching", "1:1 Coaching"],
    img: "assets/case-studies/developing-endurance-and-agency.jpg"
  },
  {
    slug: "building-trust-and-motivation-in-one-day",
    title: "Building Trust and Motivation in One Day",
    excerpt: "A single intensive session using structured exercises to surface trust gaps and get a team aligned fast, ahead of a critical deadline.",
    tags: ["Facilitation", "Team Retreat"],
    img: "assets/case-studies/building-trust-and-motivation-in-one-day.jpg"
  },
  {
    slug: "leading-together-under-pressure",
    title: "Leading Together Under Pressure",
    excerpt: "Team coaching that helped a group stuck in recurring dynamics name their patterns and build the capacity to adjust.",
    tags: ["Team Coaching"],
    img: "assets/case-studies/leading-together-under-pressure.jpg"
  },
  {
    slug: "repairing-a-ruptured-relationship",
    title: "Repairing a Ruptured Relationship",
    excerpt: "When unspoken conflict between two leaders started shaping the whole team, we worked directly with the relationship.",
    tags: ["Team Coaching", "2:2 Coaching"],
    img: "assets/case-studies/repairing-a-ruptured-relationship.jpg"
  },
  {
    slug: "building-conditions-for-results",
    title: "Building Conditions for Results",
    excerpt: "A team retreat to define the norms and routines that let a group deliver results without burning out.",
    tags: ["Facilitation", "Team Retreat"],
    img: "assets/case-studies/building-conditions-for-results.jpg"
  },
  {
    slug: "co-leading-an-organization",
    title: "Co-leading an Organization",
    excerpt: "2:2 coaching for co-directors, building the shared language and working agreements needed to lead an organization together.",
    tags: ["Team Coaching", "2:2 Coaching"],
    img: "assets/case-studies/co-leading-an-organization.jpg"
  }
];

window.WBT_ARTICLES = [
  {
    slug: "emotional-intelligence-and-leadership",
    title: "Emotional Intelligence and Leadership",
    excerpt: "How emotional intelligence helps leaders manage stress, build trust, navigate conflict, and lead stronger teams.",
    tags: ["Leadership Coaching"],
    author: "Work Better Together",
    date: "3/2/26",
    img: "assets/Collages/WBT-collage-brain-blue.png"
  },
  {
    slug: "in-service-of-the-group-the-facilitators-role",
    title: "In Service of the Group: The Facilitator's Role",
    excerpt: "Team retreats create space for reflection, awareness, and growth instead of just fixing problems.",
    tags: ["Facilitation"],
    author: "Work Better Together",
    date: "2/13/26",
    img: "assets/Collages/WBT-collage-eyeglasses-eye-chart.png"
  },
  {
    slug: "dont-skip-the-convo-about-feelings-at-your-next-team-retreat",
    title: "Don't Skip the Convo About Feelings at Your Next Retreat",
    excerpt: "Talking about feelings at work is a leadership advantage that builds trust and unlocks collaboration.",
    tags: ["Facilitation"],
    author: "Work Better Together",
    date: "2/4/26",
    img: "assets/Collages/WBT-collage-megaphone.png"
  }
];
