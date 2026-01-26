"use client";

import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
    playbackId?: string;
    className?: string;
}

export function VideoPlayer({ playbackId, className }: VideoPlayerProps) {
    if (!playbackId) return null;

    return (
        <div className={className}>
            <MuxPlayer
                playbackId={playbackId}
                streamType="on-demand"
                autoPlay="muted"
                loop
                muted
                playsInline
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
        </div>
    );
}
