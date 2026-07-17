DROP TABLE IF EXISTS emoji_updates;
DROP TABLE IF EXISTS emojis;

CREATE TABLE emojis (
    name TEXT PRIMARY KEY,
    target_user TEXT NOT NULL,
    creator TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_emojis_target_user ON emojis (target_user);

CREATE TABLE emoji_updates (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    updater TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (name) REFERENCES emojis (name) ON DELETE CASCADE
);

CREATE INDEX idx_emoji_updates_name ON emoji_updates (name);
