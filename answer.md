// Predict the Output (write in answers.md — don't run)   2 min · 3 marks
// 1.
console.log(true + 1, "3" * "4"); //2 12

console.log(1+1);
console.log(3*4);

// 2.
const o = { a: 1 }; //o.a=1
const p = o; //p=o.a 
p.a = 2; 
console.log(o.a); //2

// 3.
console.log("5" + 3, "5" - 3); //53 2

// 4.
console.log(0.1 + 0.2 === 0.3); //false

<!-- · Git Workflow   3 min · 5 marks
●	In your working folder: git init, commit the starter files, create branch feature/rooms-discount, make one change + commit, then merge it into main with --no-ff.
●	Save the result: git log --oneline --graph --all > git-log.txt.
●	In answers.md (2 lines): the command you'd use to REBASE the feature branch onto main instead, and a one-line Pull Request title for this change. -->

git init
git add .
git commit -m "Initial commit"
git branch -M main

git checkout -b feature/rooms-discount
git add .
git commit -m "Add room discount feature"
git checkout main
git merge --no-ff feature/rooms-discount
git log --oneline --graph --all > git-log.txt

<!-- git checkout feature/rooms-discount && git rebase main
PR Title: Add room discount feature -->