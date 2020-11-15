import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import { useParams } from "react-router-dom";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { COLORS } from "../constants";
import Feed from "./Feed";
import { Spinner } from "./Spinner";
import ErrorPage from "./ErrorPage";

const Profile = () => {
  const { currentUser, status, setStatus } = useContext(CurrentUserContext);
  const [profile, setProfile] = useState();
  const [loadStatus, setLoadStatus] = useState("loading");
  const { profileId } = useParams();

  useEffect(() => {
    const ac = new AbortController();
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
      })
      .then(() => setLoadStatus("loaded"))
      .catch((err) => setStatus("error"));

    return () => {
      ac.abort();
    };
  }, [profileId]);

  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <Wrapper>
      {/* {loadStatus === "loading" && <Spinner />} */}
      {loadStatus === "loaded" && (
        <>
          <ContentWrapper>
            <BannerPhoto
              src={profile.bannerSrc}
              alt={`${profile.handle}'s banner photo`}
            />
            <ProfilePicture
              src={profile.avatarSrc}
              alt={`${profile.handle}'s profile photo`}
            />
            <ProfileUserInfo>
              <NameAndHandle>
                <Name>{profile.displayName}</Name>
                <Handle>@{profile.handle}</Handle>
              </NameAndHandle>
              <Bio>{profile.bio}</Bio>
              <LocationAndJoined>
                <Location>
                  <FiMapPin />
                  <LocJoinInfo> {profile.location}</LocJoinInfo>
                </Location>
                <Joined>
                  <FiCalendar />
                  <LocJoinInfo> Joined {profile.joined}</LocJoinInfo>
                </Joined>
              </LocationAndJoined>
              <FollowingAndFollowers>
                <Following>
                  <strong>{profile.numFollowing}</strong> Following
                </Following>
                <p>
                  <strong>{profile.numFollowers}</strong> Followers
                </p>
              </FollowingAndFollowers>
            </ProfileUserInfo>
            <TabContainer>
              <Tab>Tweets</Tab>
              <Tab>Media</Tab>
              <Tab>Likes</Tab>
            </TabContainer>
          </ContentWrapper>
          <Feed />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
`;

const ProfileUserInfo = styled.div`
  position: relative;
  left: 36px;
  top: -100px;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div``;

const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  position: relative;
  left: 36px;
  top: -100px;
  border: 4px solid white;
`;

const BannerPhoto = styled.img`
  width: 100%;
  max-height: 300px;
`;

const NameAndHandle = styled.div`
  line-height: 1.2;
`;

const Name = styled.h1`
  font-size: 24px;
`;

const Handle = styled.p`
  color: gray;
`;

const Bio = styled.p``;

const LocationAndJoined = styled.div`
  display: flex;
`;

const Location = styled.div`
  display: flex;
  margin-right: 16px;
`;

const Joined = styled.div`
  display: flex;
`;

const LocJoinInfo = styled.p`
  margin-left: 6px;
`;

const FollowingAndFollowers = styled.div`
  display: flex;
`;

const Following = styled.p`
  margin-right: 16px;
`;

const TabContainer = styled.div`
  position: relative;
  top: -90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Tab = styled.div`
  padding: 20px 0;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid gray;
  font-weight: 600;
  &:hover {
    border-bottom: 1px solid ${COLORS.primary};
    color: ${COLORS.primary};
  }
  &:focus {
    color: ${COLORS.primary};
    border-bottom: 1px solid ${COLORS.primary};
  }
  &.active {
    color: ${COLORS.primary};
    border-bottom: 1px solid ${COLORS.primary};
  }
`;

export default Profile;
