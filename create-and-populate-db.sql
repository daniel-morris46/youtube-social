create database youtube_social;

\c youtube_social;


create table feed
(
	id varchar(36) not null,
	createddate timestamp,
	video_id varchar(100),
	user_id varchar(36) not null,
	deleteddate timestamp,
	constraint feed_pk
		primary key (id)
);


create table friends
(
	user_id_1 varchar(36),
	user_id_2 varchar(36),
	createddate timestamp,
	deleteddate timestamp
);



create table users
(
	id varchar(36) not null,
	name varchar(100),
	channel_id varchar(100),
	constraint users_pk
		primary key (id)
);



INSERT INTO public.users (id, name, channel_id) VALUES ('3f8c9857-cd46-466c-addf-ac805c1e8492', 'Peter Morris', 'UCBNBHYR1BtcPW_sklTZq9HA');
INSERT INTO public.users (id, name, channel_id) VALUES ('3b38d5d1-7c13-4ace-992f-3bd15e969801', 'Will', 'UCKuHFYu3smtrl2AwwMOXOlg');
INSERT INTO public.users (id, name, channel_id) VALUES ('53a3a93c-7100-42a8-9021-fd204aa7deef', 'Bob', 'UCpuvu8mrEO4jxjT6sRwE8tg');
INSERT INTO public.users (id, name, channel_id) VALUES ('9d413ee7-86e3-42df-bb41-91e7d0c12238', 'Daniel', 'UCkqOfFZlxHaLs7qjOl4WZig');
INSERT INTO public.users (id, name, channel_id) VALUES ('1b64076f-dcb8-4ebe-876b-af868e7b1082', 'Mary-Jayne Morris', 'UCmBDLtPxPqaQZSsibQAPA6w');

INSERT INTO public.feed (id, createddate, video_id, user_id, deleteddate) VALUES ('242e3690-9c05-4a5c-9cde-b4bac56ed029', '2020-04-10 23:45:55.607295', 'xWggTb45brM', '9d413ee7-86e3-42df-bb41-91e7d0c12238', null);
INSERT INTO public.feed (id, createddate, video_id, user_id, deleteddate) VALUES ('14255b80-3591-49eb-97a7-d02250ea85ac', '2020-04-10 21:56:10.000000', 'VJeC0ChCuao', '9d413ee7-86e3-42df-bb41-91e7d0c12238', null);
INSERT INTO public.feed (id, createddate, video_id, user_id, deleteddate) VALUES ('e82f24c0-74e2-4124-99f5-c30f9e1fb2ef', '2020-04-11 04:45:28.409391', '09R8_2nJtjg', '3f8c9857-cd46-466c-addf-ac805c1e8492', null);
INSERT INTO public.feed (id, createddate, video_id, user_id, deleteddate) VALUES ('60919d28-e04f-4d5b-a060-88111c69ddbf', '2020-04-11 16:52:24.831067', '-xY_D8SMNtE', '9d413ee7-86e3-42df-bb41-91e7d0c12238', null);
INSERT INTO public.feed (id, createddate, video_id, user_id, deleteddate) VALUES ('5c1bb953-7811-441a-aa5a-8c507baa2aaa', '2020-04-11 17:12:49.756177', 'foshNOlNx8s', '3f8c9857-cd46-466c-addf-ac805c1e8492', null);
INSERT INTO public.feed (id, createddate, video_id, user_id, deleteddate) VALUES ('333556e7-997e-4a4e-9d47-f17191074369', '2020-04-11 19:13:27.859703', '4ASbsgeF2Eo', '9d413ee7-86e3-42df-bb41-91e7d0c12238', null);
INSERT INTO public.feed (id, createddate, video_id, user_id, deleteddate) VALUES ('81fd5d1e-b3d4-4609-9451-1cc555beae13', '2020-04-11 19:21:13.849531', 'tHbCkikFfDE', '9d413ee7-86e3-42df-bb41-91e7d0c12238', null);
INSERT INTO public.feed (id, createddate, video_id, user_id, deleteddate) VALUES ('b33a279e-7fab-42c7-9286-5c043d6f3de8', '2020-04-11 19:24:15.189708', '_8041cMesl4', '9d413ee7-86e3-42df-bb41-91e7d0c12238', null);
INSERT INTO public.feed (id, createddate, video_id, user_id, deleteddate) VALUES ('4ba30ce8-742c-40b3-a3f3-e5f2a7dd3fd8', '2020-04-11 19:26:44.016758', '-CmadmM5cOk', '1b64076f-dcb8-4ebe-876b-af868e7b1082', null);