import { FoxcloudPortalPage } from './app.po';

describe('foxcloud-portal App', function() {
  let page: FoxcloudPortalPage;

  beforeEach(() => {
    page = new FoxcloudPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
