// Define each track with its respective duration in seconds
const musicTracks = [
  { soundid: 1056, duration: 74 }, 
  { soundid: 1080, duration: 206 },// 206 seconds
  
  //{ soundid: 6666, duration: 666 }, //-> new music
];

//registrar, dont touch it
musicTracks.forEach(element => {
  element.music = new SoundEmitter(element.soundid);
  element.music.global = true;
  Game.newSoundEmitter(element.music);
});

async function playMusicLoop(player) {
  while (true) {
    // Loop through each track
    for (const { sound, duration,music } of musicTracks) {
      // Play the current sound
      player.playSound(music);
      
      // Wait for the duration to pass before playing the next sound
      await new Promise(resolve => setTimeout(resolve, duration*1000));
    }
  }
}

// Trigger the music loop when a player spawns
Game.on('initialSpawn', (player) => {
  playMusicLoop(player);
});
