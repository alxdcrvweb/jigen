import { injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';
import { LegacyRef } from 'react';
import ReactPlayer from 'react-player';
import 'reflect-metadata';
import { RootStore } from './RootStore';



@injectable()
export class VideoStore {
	@observable video: LegacyRef<ReactPlayer> | undefined
	@observable playing: boolean = true
	@observable muted: boolean = true


	public constructor(private readonly rootStore: RootStore) {
		makeObservable(this)
	}

	setPlayer = (video: LegacyRef<ReactPlayer> | undefined) => {
		console.log('setPlayer');
		this.video = video
	}

	playPauseHandler = () => {
		console.log('playPauseHandler 1 ',this.playing)
		this.playing = !this.playing
		console.log('playPauseHandler 2',this.playing)
	}

	mutedHandler = () => {
		console.log('mutedHandler');
		this.muted = !this.muted
	}

}
