import { Angular2fundamentalsPage } from './app.po';

describe('angular2fundamentals App', () => {
  let page: Angular2fundamentalsPage;

  beforeEach(() => {
    page = new Angular2fundamentalsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
