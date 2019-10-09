const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  console.log('Get Notes');
}

const listNotes = () => {
  //code - debugger
  //cmd - node inspect app list
  //browser - chrome://inspect -< Remote Target - Inspect -> Add folder to workspace
  console.log(chalk.green.inverse('Your notes'));
  console.table(loadNotes());
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => {
    return note.title === title;
  });
  if (note) {
    console.log(chalk.green(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red('There is no match'));
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  saveNotes(notesToKeep);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed'));
  } else {
    console.log(chalk.red.inverse('No note found'));
  }
}

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => {
    return note.title === title;
  });
  if (duplicateNote) {
    console.log('Some duplicates founded');
  } else {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes);
    console.log('New note added');
  }
  
}

const loadNotes = () => {
  try {
    const data = JSON.parse(fs.readFileSync('notes.json').toString());
    return data;
  } catch (error) {
    return [];
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};