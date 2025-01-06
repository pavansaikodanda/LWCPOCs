import { LightningElement, track } from 'lwc';

export default class MoodSelector extends LightningElement {
    @track selectedMood = 'Happy'; // Default mood
    @track backgroundStyle = 'background-color: #fef9c3'; // Default background color

    // Map of moods to their emojis and colors
    moodData = {
        Happy: { emoji: '😊', color: '#fef9c3' },
        Sad: { emoji: '😢', color: '#d3f4ff' },
        Angry: { emoji: '😡', color: '#fddede' },
        Excited: { emoji: '🤩', color: '#ffe4b5' },
        Relaxed: { emoji: '😌', color: '#e8f5e9' },
    };

    handleMoodChange(event) {
        const newMood = event.target.value;
        this.selectedMood = newMood;
        this.backgroundStyle = `background-color: ${this.moodData[newMood].color}`;
    }

    get moodOptions() {
        return Object.keys(this.moodData).map((mood) => ({
            label: mood,
            value: mood,
        }));
    }

    get emoji() {
        return this.moodData[this.selectedMood].emoji;
    }
}