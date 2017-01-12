import { MusicpipesWebPage } from './app.po';

describe('musicpipes-web App', function() {
  let page: MusicpipesWebPage;

  beforeEach(() => {
    page = new MusicpipesWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
