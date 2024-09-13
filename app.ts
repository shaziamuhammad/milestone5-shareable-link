

// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as
HTMLDivElement;

const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;

const shareableLinkElement = document.getElementById('shareable-link') as
HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as
HTMLButtonElement
// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // prevent page reload

    // Get referenceto form elements using IDs

    
    const username = (document.getElementById('username') as
HTMLInputElement).value;
   
   const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement ;

    const name = (document.getElementById('name') as HTMLInputElement).value ;
    const email = (document.getElementById('email') as HTMLInputElement) ;
    const address = (document.getElementById('address') as HTMLInputElement).value ;
    const phone = (document.getElementById('phone') as HTMLInputElement).value ;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value ;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value ;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value ;

   

    
    // picture elements
    const profilePictureFile = profilePictureInput.files?.[0] 
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
    
    // Save form data in localStorage with the username as the key
const resumeData = {
   profilePictureInput,
    name,
    email,
    address,
    phone,
    education,
    experience,
    skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the
    // data locally

    // create resume output
    const resumeHTML =  `
<h2> Editable Resume</h2>
${
    profilePictureURL ? 
    `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""
}

<p><strong>Name:</strong>  <span contenteditable="true">${name}</span></p>
<p><strong>Email:</strong> <span contenteditable="true">${email}</span> </p>

<p><strong>Address:</strong><span contenteditable="true"> ${address}</span> </p>
<p><strong>Phone Number:</strong> <span contenteditable="true">${phone}</span> </p>

<h3>Education</h3>
<p contenteditable="true">${education}</p>

<h3>Experience</h3>
<p contenteditable="true">${experience}</p>

<h3>Skills</h3>
<p contenteditable="true">${skills}</p>

    `;
    // Display the generated resume
resumeDisplayElement.innerHTML = resumeHTML;

// Generate a shareable URL with the username only
const shareableURL =
`${window.location.origin}?username=${encodeURIComponent(username)}`;
// Display the shareable link
shareableLinkContainer.style.display = 'block';
shareableLinkElement.href = shareableURL;
shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
window.print(); // This will open the print dialog and allow the user to save as PDF

});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {

// Autofill form if data is found in localStorage
const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
const resumeData = JSON.parse(savedResumeData);
(document.getElementById('username') as HTMLInputElement).value =
username;
(document.getElementById('name') as HTMLInputElement).value =
resumeData.name;
(document.getElementById('email') as HTMLInputElement).value =
resumeData.email;
(document.getElementById('phone') as HTMLInputElement).value =
resumeData.phone;
(document.getElementById('education') as HTMLTextAreaElement).value =
resumeData.education;
(document.getElementById('experience') as HTMLTextAreaElement).value
= resumeData.experience;
(document.getElementById('skills') as HTMLTextAreaElement).value =
resumeData.skills;
}
}
});