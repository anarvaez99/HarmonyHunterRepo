/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComments = /* GraphQL */ `
  mutation CreateComments(
    $input: CreateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    createComments(input: $input, condition: $condition) {
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
export const updateComments = /* GraphQL */ `
  mutation UpdateComments(
    $input: UpdateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    updateComments(input: $input, condition: $condition) {
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
export const deleteComments = /* GraphQL */ `
  mutation DeleteComments(
    $input: DeleteCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    deleteComments(input: $input, condition: $condition) {
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
export const createTopicLogs = /* GraphQL */ `
  mutation CreateTopicLogs(
    $input: CreateTopicLogsInput!
    $condition: ModelTopicLogsConditionInput
  ) {
    createTopicLogs(input: $input, condition: $condition) {
      id
      SearchType
      SearchTopic
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTopicLogs = /* GraphQL */ `
  mutation UpdateTopicLogs(
    $input: UpdateTopicLogsInput!
    $condition: ModelTopicLogsConditionInput
  ) {
    updateTopicLogs(input: $input, condition: $condition) {
      id
      SearchType
      SearchTopic
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTopicLogs = /* GraphQL */ `
  mutation DeleteTopicLogs(
    $input: DeleteTopicLogsInput!
    $condition: ModelTopicLogsConditionInput
  ) {
    deleteTopicLogs(input: $input, condition: $condition) {
      id
      SearchType
      SearchTopic
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMusicalInteraction = /* GraphQL */ `
  mutation CreateMusicalInteraction(
    $input: CreateMusicalInteractionInput!
    $condition: ModelMusicalInteractionConditionInput
  ) {
    createMusicalInteraction(input: $input, condition: $condition) {
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
export const updateMusicalInteraction = /* GraphQL */ `
  mutation UpdateMusicalInteraction(
    $input: UpdateMusicalInteractionInput!
    $condition: ModelMusicalInteractionConditionInput
  ) {
    updateMusicalInteraction(input: $input, condition: $condition) {
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
export const deleteMusicalInteraction = /* GraphQL */ `
  mutation DeleteMusicalInteraction(
    $input: DeleteMusicalInteractionInput!
    $condition: ModelMusicalInteractionConditionInput
  ) {
    deleteMusicalInteraction(input: $input, condition: $condition) {
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
export const createBroadwayMusicals = /* GraphQL */ `
  mutation CreateBroadwayMusicals(
    $input: CreateBroadwayMusicalsInput!
    $condition: ModelBroadwayMusicalsConditionInput
  ) {
    createBroadwayMusicals(input: $input, condition: $condition) {
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
export const updateBroadwayMusicals = /* GraphQL */ `
  mutation UpdateBroadwayMusicals(
    $input: UpdateBroadwayMusicalsInput!
    $condition: ModelBroadwayMusicalsConditionInput
  ) {
    updateBroadwayMusicals(input: $input, condition: $condition) {
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
export const deleteBroadwayMusicals = /* GraphQL */ `
  mutation DeleteBroadwayMusicals(
    $input: DeleteBroadwayMusicalsInput!
    $condition: ModelBroadwayMusicalsConditionInput
  ) {
    deleteBroadwayMusicals(input: $input, condition: $condition) {
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
