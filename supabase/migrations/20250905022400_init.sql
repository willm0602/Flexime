CREATE TABLE public.configuration (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  resume json NOT NULL,
  name character varying NOT NULL,
  CONSTRAINT configuration_pkey PRIMARY KEY (id),
  CONSTRAINT configuration_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE public.resume (
  user_id uuid,
  contents jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT resume_pkey PRIMARY KEY (id),
  CONSTRAINT resume_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE public.userprofile (
  resume jsonb,
  user_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT userprofile_pkey PRIMARY KEY (id),
  CONSTRAINT userprofile_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);