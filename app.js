const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

yargs.command(
  'add',
  'Add a new note',
  {
    title: {
      describe: 'Note title',
      type: 'string',
      demandOption: true
    },
    body: {
      describe: 'Note body',
      type: 'string',
      demandOption: true
    }
  },
  (argv) => {
    notes.addNote(argv.title, argv.body);
  })
  .argv;

yargs.command(
  'remove',
  'Remove the note',
  {
    title: {
      describe: 'Note title',
      type: 'string',
      demandOption: true
    }
  },
  (argv) => {
    notes.removeNote(argv.title);
  })
  .argv;

yargs.command(
  'list',
  'Show list of notes',
  {},
  () => {
    notes.listNotes();
  })
  .argv;

yargs.command(
  'read',
  'Read from the file',
  {
    title: {
      describe: 'Note title',
      type: 'string',
      demandOption: true
    }
  },
  (argv) => {
    notes.readNote(argv.title);
  })
  .argv;

console.log(yargs.argv);