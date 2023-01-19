PGDMP     7                     {            skoolify    14.5    14.5 /    -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            0           1262    24781    skoolify    DATABASE     S   CREATE DATABASE skoolify WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE skoolify;
                admin    false            P           1247    24833    accout_type    TYPE     S   CREATE TYPE public.accout_type AS ENUM (
    'ADMIN',
    'PARENT',
    'OWNER'
);
    DROP TYPE public.accout_type;
       public          postgres    false            �            1259    24810    application    TABLE     �   CREATE TABLE public.application (
    application_id integer NOT NULL,
    owner_id integer NOT NULL,
    vehicle_id integer NOT NULL,
    price money NOT NULL,
    school_id integer NOT NULL
);
    DROP TABLE public.application;
       public         heap    admin    false            �            1259    24809    application_application_id_seq    SEQUENCE     �   CREATE SEQUENCE public.application_application_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.application_application_id_seq;
       public          admin    false    214            1           0    0    application_application_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.application_application_id_seq OWNED BY public.application.application_id;
          public          admin    false    213            �            1259    24801    requests    TABLE     �   CREATE TABLE public.requests (
    request_id integer NOT NULL,
    parent_id integer NOT NULL,
    owner_id integer NOT NULL,
    school_id integer NOT NULL,
    children_info text NOT NULL,
    message text,
    "pickUp_address" text NOT NULL
);
    DROP TABLE public.requests;
       public         heap    admin    false            �            1259    24800    requests_request_id_seq    SEQUENCE     �   CREATE SEQUENCE public.requests_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.requests_request_id_seq;
       public          admin    false    212            2           0    0    requests_request_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.requests_request_id_seq OWNED BY public.requests.request_id;
          public          admin    false    211            �            1259    24824    school    TABLE     �   CREATE TABLE public.school (
    school_id integer NOT NULL,
    school_name character varying(255) NOT NULL,
    school_location text NOT NULL
);
    DROP TABLE public.school;
       public         heap    admin    false            �            1259    24823    school_school_id_seq    SEQUENCE     �   CREATE SEQUENCE public.school_school_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.school_school_id_seq;
       public          admin    false    218            3           0    0    school_school_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.school_school_id_seq OWNED BY public.school.school_id;
          public          admin    false    217            �            1259    24845    users    TABLE       CREATE TABLE public.users (
    user_id integer NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    is_suspended boolean NOT NULL,
    gender text NOT NULL,
    image text NOT NULL,
    account public.accout_type
);
    DROP TABLE public.users;
       public         heap    postgres    false    848            �            1259    24844    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    220            4           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    219            �            1259    24792    vehicle    TABLE       CREATE TABLE public.vehicle (
    vehicle_id integer NOT NULL,
    owner_id integer NOT NULL,
    brand character varying(255) NOT NULL,
    model character varying(255) NOT NULL,
    vehicle_reg character varying(255) NOT NULL,
    driver_name character varying(255) NOT NULL,
    driver_cellphone character varying(255) NOT NULL,
    driver_image character varying(255) NOT NULL,
    document character varying(255) NOT NULL,
    color character varying(255) NOT NULL,
    vehicle_image character varying(255) NOT NULL
);
    DROP TABLE public.vehicle;
       public         heap    admin    false            �            1259    24817    vehicle_owner    TABLE     �   CREATE TABLE public.vehicle_owner (
    id integer NOT NULL,
    owner_id integer NOT NULL,
    school_id integer NOT NULL,
    vehicle_id integer NOT NULL
);
 !   DROP TABLE public.vehicle_owner;
       public         heap    admin    false            �            1259    24816    vehicle_owner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vehicle_owner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.vehicle_owner_id_seq;
       public          admin    false    216            5           0    0    vehicle_owner_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.vehicle_owner_id_seq OWNED BY public.vehicle_owner.id;
          public          admin    false    215            �            1259    24791    vehicle_vehicle_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vehicle_vehicle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.vehicle_vehicle_id_seq;
       public          admin    false    210            6           0    0    vehicle_vehicle_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.vehicle_vehicle_id_seq OWNED BY public.vehicle.vehicle_id;
          public          admin    false    209            �           2604    24813    application application_id    DEFAULT     �   ALTER TABLE ONLY public.application ALTER COLUMN application_id SET DEFAULT nextval('public.application_application_id_seq'::regclass);
 I   ALTER TABLE public.application ALTER COLUMN application_id DROP DEFAULT;
       public          admin    false    213    214    214            �           2604    24804    requests request_id    DEFAULT     z   ALTER TABLE ONLY public.requests ALTER COLUMN request_id SET DEFAULT nextval('public.requests_request_id_seq'::regclass);
 B   ALTER TABLE public.requests ALTER COLUMN request_id DROP DEFAULT;
       public          admin    false    211    212    212            �           2604    24827    school school_id    DEFAULT     t   ALTER TABLE ONLY public.school ALTER COLUMN school_id SET DEFAULT nextval('public.school_school_id_seq'::regclass);
 ?   ALTER TABLE public.school ALTER COLUMN school_id DROP DEFAULT;
       public          admin    false    218    217    218            �           2604    24848    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    24795    vehicle vehicle_id    DEFAULT     x   ALTER TABLE ONLY public.vehicle ALTER COLUMN vehicle_id SET DEFAULT nextval('public.vehicle_vehicle_id_seq'::regclass);
 A   ALTER TABLE public.vehicle ALTER COLUMN vehicle_id DROP DEFAULT;
       public          admin    false    210    209    210            �           2604    24820    vehicle_owner id    DEFAULT     t   ALTER TABLE ONLY public.vehicle_owner ALTER COLUMN id SET DEFAULT nextval('public.vehicle_owner_id_seq'::regclass);
 ?   ALTER TABLE public.vehicle_owner ALTER COLUMN id DROP DEFAULT;
       public          admin    false    216    215    216            $          0    24810    application 
   TABLE DATA           ]   COPY public.application (application_id, owner_id, vehicle_id, price, school_id) FROM stdin;
    public          admin    false    214   �5       "          0    24801    requests 
   TABLE DATA           x   COPY public.requests (request_id, parent_id, owner_id, school_id, children_info, message, "pickUp_address") FROM stdin;
    public          admin    false    212   �5       (          0    24824    school 
   TABLE DATA           I   COPY public.school (school_id, school_name, school_location) FROM stdin;
    public          admin    false    218   �5       *          0    24845    users 
   TABLE DATA           n   COPY public.users (user_id, name, surname, email, password, is_suspended, gender, image, account) FROM stdin;
    public          postgres    false    220   �5                  0    24792    vehicle 
   TABLE DATA           �   COPY public.vehicle (vehicle_id, owner_id, brand, model, vehicle_reg, driver_name, driver_cellphone, driver_image, document, color, vehicle_image) FROM stdin;
    public          admin    false    210   6       &          0    24817    vehicle_owner 
   TABLE DATA           L   COPY public.vehicle_owner (id, owner_id, school_id, vehicle_id) FROM stdin;
    public          admin    false    216   76       7           0    0    application_application_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.application_application_id_seq', 1, false);
          public          admin    false    213            8           0    0    requests_request_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.requests_request_id_seq', 1, false);
          public          admin    false    211            9           0    0    school_school_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.school_school_id_seq', 1, false);
          public          admin    false    217            :           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);
          public          postgres    false    219            ;           0    0    vehicle_owner_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.vehicle_owner_id_seq', 1, false);
          public          admin    false    215            <           0    0    vehicle_vehicle_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.vehicle_vehicle_id_seq', 1, false);
          public          admin    false    209            �           2606    24815    application application_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.application
    ADD CONSTRAINT application_pkey PRIMARY KEY (application_id);
 F   ALTER TABLE ONLY public.application DROP CONSTRAINT application_pkey;
       public            admin    false    214            �           2606    24808    requests requests_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (request_id);
 @   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_pkey;
       public            admin    false    212            �           2606    24831    school school_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.school
    ADD CONSTRAINT school_pkey PRIMARY KEY (school_id);
 <   ALTER TABLE ONLY public.school DROP CONSTRAINT school_pkey;
       public            admin    false    218            �           2606    24852    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220            �           2606    24822     vehicle_owner vehicle_owner_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.vehicle_owner
    ADD CONSTRAINT vehicle_owner_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.vehicle_owner DROP CONSTRAINT vehicle_owner_pkey;
       public            admin    false    216            �           2606    24799    vehicle vehicle_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (vehicle_id);
 >   ALTER TABLE ONLY public.vehicle DROP CONSTRAINT vehicle_pkey;
       public            admin    false    210            $      x������ � �      "      x������ � �      (      x������ � �      *      x������ � �             x������ � �      &      x������ � �     