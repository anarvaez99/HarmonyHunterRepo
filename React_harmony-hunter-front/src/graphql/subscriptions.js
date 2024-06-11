/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComments = /* GraphQL */ `
  subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onCreateComments(filter: $filter) {
      id
      MusicalId
      IsSpoiler
      Comment
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onUpdateComments(filter: $filter) {
      id
      MusicalId
      IsSpoiler
      Comment
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
    onDeleteComments(filter: $filter) {
      id
      MusicalId
      IsSpoiler
      Comment
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTopicLogs = /* GraphQL */ `
  subscription OnCreateTopicLogs(
    $filter: ModelSubscriptionTopicLogsFilterInput
  ) {
    onCreateTopicLogs(filter: $filter) {
      id
      SearchType
      SearchTopic
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTopicLogs = /* GraphQL */ `
  subscription OnUpdateTopicLogs(
    $filter: ModelSubscriptionTopicLogsFilterInput
  ) {
    onUpdateTopicLogs(filter: $filter) {
      id
      SearchType
      SearchTopic
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTopicLogs = /* GraphQL */ `
  subscription OnDeleteTopicLogs(
    $filter: ModelSubscriptionTopicLogsFilterInput
  ) {
    onDeleteTopicLogs(filter: $filter) {
      id
      SearchType
      SearchTopic
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMusicalInteraction = /* GraphQL */ `
  subscription OnCreateMusicalInteraction(
    $filter: ModelSubscriptionMusicalInteractionFilterInput
  ) {
    onCreateMusicalInteraction(filter: $filter) {
      id
      UserName
      MusicalId
      LikedStatus
      WatchListStatus
      SongLiked
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMusicalInteraction = /* GraphQL */ `
  subscription OnUpdateMusicalInteraction(
    $filter: ModelSubscriptionMusicalInteractionFilterInput
  ) {
    onUpdateMusicalInteraction(filter: $filter) {
      id
      UserName
      MusicalId
      LikedStatus
      WatchListStatus
      SongLiked
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMusicalInteraction = /* GraphQL */ `
  subscription OnDeleteMusicalInteraction(
    $filter: ModelSubscriptionMusicalInteractionFilterInput
  ) {
    onDeleteMusicalInteraction(filter: $filter) {
      id
      UserName
      MusicalId
      LikedStatus
      WatchListStatus
      SongLiked
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBroadwayMusicals = /* GraphQL */ `
  subscription OnCreateBroadwayMusicals(
    $filter: ModelSubscriptionBroadwayMusicalsFilterInput
  ) {
    onCreateBroadwayMusicals(filter: $filter) {
      id
      MusicalName
      ReleaseYear
      ProductionType
      MusicAuthor
      WikiLink
      PosterLink
      SpotifyLink
      TrackList
      MusicDuration
      MusicalSummary
      MusicalTopics
      SearchType
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBroadwayMusicals = /* GraphQL */ `
  subscription OnUpdateBroadwayMusicals(
    $filter: ModelSubscriptionBroadwayMusicalsFilterInput
  ) {
    onUpdateBroadwayMusicals(filter: $filter) {
      id
      MusicalName
      ReleaseYear
      ProductionType
      MusicAuthor
      WikiLink
      PosterLink
      SpotifyLink
      TrackList
      MusicDuration
      MusicalSummary
      MusicalTopics
      SearchType
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBroadwayMusicals = /* GraphQL */ `
  subscription OnDeleteBroadwayMusicals(
    $filter: ModelSubscriptionBroadwayMusicalsFilterInput
  ) {
    onDeleteBroadwayMusicals(filter: $filter) {
      id
      MusicalName
      ReleaseYear
      ProductionType
      MusicAuthor
      WikiLink
      PosterLink
      SpotifyLink
      TrackList
      MusicDuration
      MusicalSummary
      MusicalTopics
      SearchType
      createdAt
      updatedAt
      __typename
    }
  }
`;
