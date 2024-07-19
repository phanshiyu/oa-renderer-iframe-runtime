## What
The idea is to shift the penpal logic out of each decentralised renderer and shift it instead to the host. 
The host creates kinda an iframe "runtime" where it takes a html handlebar template and injects it into its environment there by giving it access to the methods in the "runtime".

This will make it possible for template code to be extremely lean, while still possibly being able to preserve most of the functionalities of the decentralised renderer:
```
<p>
  <strong>Admission Date:</strong> {{admissionDate}} {{#if
  admissionDate}}<button
    onClick="parentApi.selectiveDisclosure('admissionDate')"
  >
    x</button
  >{{/if}}
</p>
```

`parentApi.selectiveDisclosure` seen above are the methods exposed by the "runtime" to each template.

Now that the template code can be very lean, we can stuff the entire chunk into the oa document as such:
```
"$template": "a59366a8-09f7-49cd-a7ce-228f64f04fb7:string:<h1>Transcript</h1><p><strong>Issued On:</strong>{{issuedOn}} {{#if issuedOn}}<button onclick='parentApi.selectiveDisclosure(\"issuedOn\")'>x</button>{{/if}}</p><p><strong>Admission Date:</strong>{{admissionDate}} {{#if admissionDate}}<button onclick='parentApi.selectiveDisclosure(\"admissionDate\")'>x</button>{{/if}}</p><p><strong>Graduation Date:</strong>{{graduationDate}} {{#if graduationDate}}<button onclick='parentApi.selectiveDisclosure(\"graduationDate\")'>x</button>{{/if}}</p><h2>Recipient</h2><p><strong>Name:</strong>{{recipient.name}} {{#if recipient.name}}<button onclick='parentApi.selectiveDisclosure(\"recipient.name\")'>x</button>{{/if}}</p><p><strong>NRIC:</strong>{{recipient.nric}} {{#if recipient.nric}}<button onclick='parentApi.selectiveDisclosure(\"recipient.nric\")'>x</button>{{/if}}</p><p><strong>Course:</strong>{{recipient.course}} {{#if recipient.course}}<button onclick='parentApi.selectiveDisclosure(\"recipient.course\")'>x</button>{{/if}}</p><h2>Transcript</h2><table border=\"1\"><thead><tr><th>Name</th><th>Grade</th><th>Course Credit</th><th>Course Code</th><th>Examination Date</th><th>Semester</th></tr></thead><tbody>{{#each transcript}}<tr><td>{{this.name}} {{#if this.name}}<button onclick='parentApi.selectiveDisclosure(\"transcript.{{@index}}.name\")'>x</button>{{/if}}</td><td>{{this.grade}} {{#if this.grade}}<button onclick='parentApi.selectiveDisclosure(\"transcript.{{@index}}.grade\")'>x</button>{{/if}}</td><td>{{this.courseCredit}} {{#if this.courseCredit}}<button onclick='parentApi.selectiveDisclosure(\"transcript.{{@index}}.courseCredit\")'>x</button>{{/if}}</td><td>{{this.courseCode}} {{#if this.courseCode}}<button onclick='parentApi.selectiveDisclosure(\"transcript.{{@index}}.courseCode\")'>x</button>{{/if}}</td><td>{{this.examinationDate}} {{#if this.examinationDate}}<button onclick='parentApi.selectiveDisclosure(\"transcript.{{@index}}.examinationDate\")'>x</button>{{/if}}</td><td>{{this.semester}} {{#if this.semester}}<button onclick='parentApi.selectiveDisclosure(\"transcript.{{@index}}.semester\")'>x</button>{{/if}}</td></tr>{{/each}}</tbody></table>",
```
The non minified version of the cert template can be found in `src/cert-template.html`, while the "runtime" can be found in `src/renderer-template-runtime.html`

## Try
```
npm i

npm run dev
```
