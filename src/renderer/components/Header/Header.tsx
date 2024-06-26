import Icon from 'react-fontawesome';
import * as Popover from '@radix-ui/react-popover';

import usePlayingTrack from '../../hooks/usePlayingTrack';
import Queue from '../Queue/Queue';
import PlayingBar from '../PlayingBar/PlayingBar';
import PlayerControls from '../PlayerControls/PlayerControls';
import Search from '../Search/Search';
import usePlayerStore from '../../stores/usePlayerStore';
import Cover from '../Cover/Cover';

import styles from './Header.module.css';

export default function Header() {
  const queue = usePlayerStore((state) => state.queue);
  const queueCursor = usePlayerStore((state) => state.queueCursor);

  const trackPlaying = usePlayingTrack();

  return (
    <header className={styles.header}>
      {trackPlaying && <Cover track={trackPlaying}></Cover>}
      <div style={{ display: 'flex', width:"100%" }}>
        <div className={styles.header__mainControls}>
          <PlayerControls />
        </div>
        <div className={styles.header__playingBar}>
          <PlayingBar />
        </div>
        <div className={styles.header__queue}>
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className={styles.queueToggle}>
                <Icon name="list" />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                side="bottom"
                sideOffset={6}
                align="end"
                alignOffset={-10}
                avoidCollisions={false}
                className={styles.queueContainer}
              >
                <Queue queue={queue} queueCursor={queueCursor} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
        <div className={styles.header__search}>
          <Search />
        </div>
      </div>
    </header>
  );
}
