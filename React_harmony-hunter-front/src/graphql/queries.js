/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComments = /* GraphQL */ `
  query GetComments($id: ID!) {
    getComments(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        MusicalId
        IsSpoiler
        Comment
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTopicLogs = /* GraphQL */ `
  query GetTopicLogs($id: ID!) {
    getTopicLogs(id: $id) {
      id
      SearchType
      SearchTopic
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTopicLogs = /* GraphQL */ `
  query ListTopicLogs(
    $filter: ModelTopicLogsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopicLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        SearchType
        SearchTopic
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMusicalInteraction = /* GraphQL */ `
  query GetMusicalInteraction($id: ID!) {
    getMusicalInteraction(id: $id) {
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
export const listMusicalInteractions = /* GraphQL */ `
  query ListMusicalInteractions(
    $filter: ModelMusicalInteractionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMusicalInteractions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getBroadwayMusicals = /* GraphQL */ `
  query GetBroadwayMusicals($id: ID!) {
    getBroadwayMusicals(id: $id) {
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
export const listBroadwayMusicals = /* GraphQL */ `
  query ListBroadwayMusicals(
    $filter: ModelBroadwayMusicalsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBroadwayMusicals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
