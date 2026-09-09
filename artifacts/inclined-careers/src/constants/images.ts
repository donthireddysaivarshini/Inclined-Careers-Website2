export const imageUrl = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

// Images provided for specific site sections
export const IMAGES = {
  // Section: Two paths one purpose / Built around people (Home page)
  techWorkspace: imageUrl("two-paths-one-purpose.png"),
  twoPaths: imageUrl("two-paths-one-purpose.png"),

  // Section: Your success belongs to you / No commission (Home page)
  executiveConsulting: imageUrl("your-success-belongs-to-you.png"),
  yourSuccess: imageUrl("your-success-belongs-to-you.png"),

  // Section: A Career Is More Than Just A Job / The Mission (About page)
  teamCollaboration: imageUrl("a-career-is-more-than-just-a-job.png"),
  missionCareer: imageUrl("a-career-is-more-than-just-a-job.png"),

  // Section: The right conversation comes first / Employer solutions (Services page)
  conferenceStrategy: imageUrl("the-right-conversation-comes-first.png"),
  rightConversation: imageUrl("the-right-conversation-comes-first.png"),

  // Section: Tell us what talent you need / Hiring consultation (Services page)
  corporateHq: imageUrl("tell-us-what-talent-you-need.png"),
  talentNeed: imageUrl("tell-us-what-talent-you-need.png"),

  // Additional curated imagery
  talentAdvisory: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85",
  candidDiscussion: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1600&q=85",
  glassOfficeMeeting: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=85",
  cleanWorkspace: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=85",
};
