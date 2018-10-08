// @flow
/*
 * Backend interface types.
 */

export type User = {|
  id: number,
  defaultOrganization: number,
  email: string,
  emailVerified: boolean,
  fullName: string,
  dateJoined: Date,
|}

export type Organization = {
  id: number,
  company: string,
  location: string,
  name: string,
  slug: string,
  url: string,
}

export type Project = {
  id: number,
  slug: string,
  name: string,
}

export type Session = {
  user: User,
  organization: Organization,
  project: Project,
}
