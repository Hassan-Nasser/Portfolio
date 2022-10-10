
import mydatabase from "../constants/projects.json";
import { db } from "./firebase";

addData = async () => {
    mydatabase.forEach(async (element) => {
        element.tags = element.tags.map(tag=>`/tags/${tag}`);
        const l = await firebase.firestore().collection('projects').doc(element.name).set(element);
        console.log("++++++++++++++++++", l);
    }
    )
}

  // fetch = async () => {
  //   const documents = (await getDocs(collection(db, 'projects'))).docs.map((doc) => doc.data());
  //   const json = new Blob([JSON.stringify(documents, null, 4)], { type: 'application/json' });
  //   console.log("sss",json);
  //   writeFileP(`/public/data.json`, "Hello World", (err, data) => {
  //     console.log(err || data);
  // });
  // fs.writeFile('/public/data.json', json, (err) => {
  //   if (err)
  //     console.log("Errorrr" + err);
  //   console.log("write sucessfully");
  // });
  // }
